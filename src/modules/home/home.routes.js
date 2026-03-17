import express from "express";
import * as homeController from "./home.controller.js";

const router = express.Router();

router.get("/", homeController.allPost);           // show posts

export default router;
