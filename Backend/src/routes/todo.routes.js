import { Router } from "express";
import { createTodo, deleteTodo } from "../controller/todo.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/").post(authMiddleware, createTodo);
router.route("/:todoId").delete(authMiddleware, deleteTodo);

export default router;
