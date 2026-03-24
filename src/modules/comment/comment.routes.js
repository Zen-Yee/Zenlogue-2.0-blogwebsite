import express from "express";
import * as commentController from "./comment.controller.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";
import { requireAdmin } from "../../middleware/role.middleware.js";

const router = express.Router();

router.post("/create", authMiddleware, requireAdmin, commentController.createComment);
router.patch("/:id", authMiddleware, requireAdmin, commentController.updateComment);
router.delete("/:id", authMiddleware, requireAdmin, commentController.deleteComment);

export default router;
