import express from "express";
import session from "express-session";
import dotenv from "dotenv";

import authRouter from './modules/auth/auth.routes.js';
import postRouter from './modules/post/post.routes.js';

dotenv.config();
const app = express(); 

// Set up session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // true if using HTTPS
  })
);

// res.locals: store data specific to the current request/response cycle
app.use((req, res, next) => {
  res.locals.year = new Date().getFullYear();
  res.locals.currentUser = req.session?.user || null;
  next();
});

// Set up Express middleware.
app.use(express.json()); //Parse incoming request with JSON body
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded form data (from HTML forms).
app.use(express.static("public")); //Serves static files from the public folder.

// Mounting routes
app.use("/", postRouter); // Mainpage
app.use('/auth', authRouter); // Log in, Log out, Register
app.use('/post', postRouter); // display post & create new post


export default app;