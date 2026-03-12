import * as authService from "../services/auth.service.js";

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

    req.session.user = {
      id: user.id,
      role: user.role
    };

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
