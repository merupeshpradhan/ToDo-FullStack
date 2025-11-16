import { Router } from "express";
import {
  createTask,
  deleteTask,
  getAllTasks,
  toggleTask,
} from "../controller/taskflow.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router
  .route("/")
  .post(authMiddleware, createTask)
  .get(authMiddleware, getAllTasks);

router.route("/:taskId").delete(authMiddleware, deleteTask);

router.route("/:taskId/toggle").put(authMiddleware, toggleTask);

export default router;
