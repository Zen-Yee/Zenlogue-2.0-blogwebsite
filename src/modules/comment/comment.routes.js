import express from "express";
import * as commentController from "./comment.controller.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";
import { requireOwner } from "../../middleware/role.middleware.js";

const router = express.Router();

router.post("/create", authMiddleware, commentController.createComment);
router.patch("/:id", authMiddleware, commentController.updateComment);
router.delete("/:id", authMiddleware, commentController.deleteComment);

export default router;
