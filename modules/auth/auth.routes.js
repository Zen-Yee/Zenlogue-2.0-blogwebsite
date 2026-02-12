import express from "express";
import * as authController from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/signup", authController.signup);
router.post("/signup", authController.signupSubmit);

router.get("/login", authController.login);
router.post("/login", authController.loginSubmit);

// logout route should only be accessed by whoever that ALREADY LOG IN, so before redirect to the log out page, it route to the authMiddleware first to check if the user is authenticated (log in).
router.post("/logout", authMiddleware, authController.logout);

export default router;
