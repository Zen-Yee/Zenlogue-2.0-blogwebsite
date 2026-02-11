import * as authService from "../services/auth.service.js";

export const signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await authService.createUser(email, password);

    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const login = async (req, res) => {
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
