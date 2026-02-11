import express from "express";
import authRouter from './modules/auth/auth.routes.js';

const app = express(); 

// Set up Express middleware.
app.use(express.json()); //Parse incoming request with JSON body
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded form data (from HTML forms).
app.use(express.static("public")); //Serves static files from the public folder.

// Mounting routes
app.use('/auth', authRouter);

export default app;