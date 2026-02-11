import express from 'express';
import db from '../db/pool.js';
import bcrypt from 'bcrypt';

const router = express.Router();

// When user click on login
router.get('', async (req, res) => {
    res.render('login.ejs');
});

// When user click on submit login form
router.post('/Submit', async (req, res) => {
  
  // Read information from request body
  const {userName, passWord} = req.body;

  try {
    const query = `
      SELECT user_name, password_hash, is_blocked FROM public.users
      WHERE user_name = $1;
    `;
    const result = await db.query(query, [userName]);
    // result will return an array with only one item.

    // If User not found, return "User not found in front end"
    if (result.rows.length === 0){
        return res.status(401).send(`
            <script>
                alert("User not found!");
                window.location.href = "/login";
            </script>
        `);
    }; // user not found

    const user = result.rows[0];

    if (user.is_blocked) {
            return res.status(401).send(`
                <script>
                    alert("Account Blocked");
                    window.location.href = "/login";
                </script>
            `);
    }

    const match = await bcrypt.compare(passWord, user.password_hash);

    if (match) {
        req.session.loginStatus = 1;
        await db.query (`
            UPDATE public.users
            SET login_attempts = 0
            WHERE user_name = $1;`,
            [userName]
        );
        return res.redirect('/');
    } else {
        const upLoginAttempts = `
            UPDATE public.users
            SET login_attempts = login_attempts + 1,
                is_blocked = CASE WHEN login_attempts + 1 >= 5 THEN TRUE ELSE is_blocked END
            WHERE user_name = $1
            RETURNING login_attempts, is_blocked;
        `;
        const upAttemptsResult = await db.query(upLoginAttempts , [userName]);

        const { login_attempts, is_blocked } = upAttemptsResult.rows[0];
        if (is_blocked) {
            return res.status(401).send(`
                <script>
                    alert("Account Blocked");
                    window.location.href = "/login";
                </script>
            `);
        }else{
            const attempts_left = 5 - login_attempts;
            return res.status(401).send(`
                <script>
                    alert("Password not match! Login attempts left: ${attempts_left}");
                    window.location.href = "/login";
                </script>
            `);
        }
    }

  } catch (err) {
    console.error('Error fetching post:', err);
    res.status(500).render('error', { message: 'Database error' });
  }
});

export default router;