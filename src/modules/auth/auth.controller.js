import * as authService from "./auth.service.js";
import jwt from 'jsonwebtoken';

export const signup = (req, res) => {
    res.render("signup.ejs");
};

export const signupSubmit = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).render("error", { message: "All fields are required" });
    }

    const user = await authService.createUser(username, email, password);

    // Store user in session
    req.session.user = {
      user_id: user.user_id,
      userName: user.user_name,
      role: user.role
    };

    const token = jwt.sign(
      { userId: user.user_id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // true if using HTTPS
      maxAge: 60 * 60 * 1000
    });

    res.redirect("/");

  } catch (err) {
    console.error(err);
    res.status(400).render("error", { message: err.message });
  }
};

export const login = (req, res) => {
    res.render("login.ejs");
};

export const loginSubmit = async (req, res) => {
  try {
    const { userName, passWord } = req.body;

    const user = await authService.loginUser(userName, passWord);

    // Store user in session
    req.session.user = {
      user_id: user.user_id,
      userName: user.user_name,
      role: user.role
    };

    const token = jwt.sign(
      { userId: user.user_id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // true if using HTTPS
      maxAge: 60 * 60 * 1000
    });

    res.redirect("/"); // now nav buttons see currentUser

  } catch (err) {
    res.status(401).render("error", { message: err.message });
  }
};

export const logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/"); 
  });
};
