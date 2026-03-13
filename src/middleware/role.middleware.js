export const requireAdmin = (req, res, next) => {

  if (req.user.role !== "admin") {
    return res.status(403).render("403", {
      message: "Forbidden"
    });
  }

  next();
};