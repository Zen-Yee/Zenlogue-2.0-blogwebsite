import express from "express";
import 'dotenv/config';
import session from 'express-session';

import db from './db/pool.js';
import postRouter from './routes/post.js';
import loginRouter from './routes/login.js';
import signupRouter from './routes/signup.js';

const app = express();
const port =  process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use((req, res, next) => {
  res.locals.year = new Date().getFullYear();
  res.locals.loginStatus = req.session.loginStatus || 0;;
  next();
});

app.use('/post', postRouter);
app.use('/login', loginRouter);
app.use('/signup', signupRouter);

app.get("/", async(req, res) => {
  try {
      const query = `
        SELECT * FROM public.posts;
      `;
      const result = await db.query(query);
      const posts = result.rows;
  
      // If it return an empty array, throw error:
      if (result.rows.length === 0) {
        // Post not found → return 404 page or redirect
        return res.status(404).render('404', { message: 'Post not found' });
      }
      
      res.render('index.ejs', {posts});
  
    } catch (err) {
      console.error('Error fetching post:', err);
      res.status(500).render('error', { message: 'Database error' });
    }
});

app.get('/logout', (req, res) => {
  req.session.loginStatus = 0;
  res.redirect('/');  
});

app.get("/about", (req, res) => {
    res.render("about.ejs");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

