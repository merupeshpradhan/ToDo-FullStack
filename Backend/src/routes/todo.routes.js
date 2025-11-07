import { Router } from "express";
import { createTodo } from "../controller/todo.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/").post(authMiddleware, createTodo);

export default router;
