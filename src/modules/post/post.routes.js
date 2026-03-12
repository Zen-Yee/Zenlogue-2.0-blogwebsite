import express from "express";
import * as postController from "../post.controller.js";
import { authMiddleware } from "../auth.middleware.js";

const router = express.Router();

router.get("/:id", postController.specificPost);
router.post("/submit",authMiddleware,postController.createPost)

export default router;
