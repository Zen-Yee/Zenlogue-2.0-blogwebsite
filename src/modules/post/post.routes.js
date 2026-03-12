import express from "express";
import * as postController from "../post.controller.js";
import { authMiddleware } from "../auth.middleware.js";

const router = express.Router();

router.get("/all", postController.allPost);
router.post("/new",authMiddleware,postController.newPost)
router.post("/new/submit",authMiddleware,postController.createPost)

export default router;
