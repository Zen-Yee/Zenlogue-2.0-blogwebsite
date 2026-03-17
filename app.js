import express from "express";
import session from "express-session";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import authRouter from './src/modules/auth/auth.routes.js';
import postRouter from './src/modules/post/post.routes.js';

dotenv.config();
const app = express(); 

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// View engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"));

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
app.use(express.static(path.join(__dirname, "src/public")));

// Mounting routes
app.use("/", postRouter); // Mainpage
app.use('/auth', authRouter); // Log in, Log out, Register
app.use('/post', postRouter); // display post & create new post


export default app;
