export const authMiddleware = (req, res, next) => {

  if (!req.session.user) {
    return res.status(401).redirect("/auth/login");
  }

  req.user = req.session.user;

  next();
};