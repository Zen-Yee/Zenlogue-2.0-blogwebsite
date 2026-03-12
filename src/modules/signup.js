import express from 'express';
import db from '../db/pool.js';
import bcrypt from 'bcrypt';

const router = express.Router();

// When user click on signup
router.get('', async (req, res) => {
    res.render('signup.ejs');
});

// When user click on submit signup form
router.post('/Submit', async (req, res) => {
  
  // Read information from request body
  const {userName, eMail, passWord} = req.body;

  // Hash the password
  const saltRounds = 10;
  const password_hash = await bcrypt.hash(passWord, saltRounds);

  try {
    const query = `
      INSERT INTO public.users ("user_name","email","password_hash")
      VALUES ($1, $2, $3)
    `;

    await db.query(query, [userName, eMail, password_hash]);

    req.session.loginStatus = 1;
    return res.redirect('/');

  } catch (err) {
        if (err.code === '23505') {
            // Unique violation
            if (err.detail.includes('email')) {
                res.status(400).send("Email already registered");
            }
        } else {
            console.error(err);
            res.status(500).send("Database error");
        }
  }
});

export default router;