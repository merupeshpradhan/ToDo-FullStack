import { Router } from "express";
import {
  createTodo,
  deleteTodo,
  getAllTodos,
  toggleTodo,
} from "../controller/todo.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router
  .route("/")
  .post(authMiddleware, createTodo)
  .get(authMiddleware, getAllTodos);

router.route("/:todoId").delete(authMiddleware, deleteTodo);

router.route("/:todoId/toggle").put(authMiddleware, toggleTodo);

export default router;
