import * as authService from "./auth.service.js";
import jwt from 'jsonwebtoken';

export const signup = (req, res) => {
    res.render("signup.ejs");
};

export const signupSubmit = async (req, res) => {
  try {
    const { eMail, passWord } = req.body;

    const user = await authService.createUser(eMail, passWord);

    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const login = (req, res) => {
    res.render("login.ejs");
};

export const loginSubmit = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await authService.loginUser(email, password);

    const token = jwt.sign(
    { userId: user.user_id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" } // 1 hour expiry
  );

    res.cookie("token", token, {
    httpOnly: true,
    secure: false, // set true in production with HTTPS
    maxAge: 60 * 60 * 1000, // 1 hour
  });

    res.json({ message: "Login successful" });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

export const logout = (req, res) => {
  req.session.destroy(() => {
    res.json({ message: "Logged out" });
  });
};
