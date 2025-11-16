import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { TaskFlow } from "../models/taskflow.schema.js";

const createTask = asyncHandler(async (req, res) => {
  const { title } = req.body;

  if (!title || title.trim() === "") {
    throw new ApiError(401, "Please write something for your Task.");
  }

  const task = await TaskFlow.create({ title, user: req.user._id });

  return res
    .status(201)
    .json(new ApiResponse(201, task, "Task added successfully."));
});

const getAllTasks = asyncHandler(async (req, res) => {
  const tasks = await TaskFlow.find({ user: req.user._id }).sort({
    createdAt: -1,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, tasks, "Fetched all tasks Successfully."));
});

const deleteTask = asyncHandler(async (req, res) => {
  const { taskId  } = req.params;

  const task = await TaskFlow.findById(taskId );
  if (!task) {
    throw new ApiError(404, "Task not found.");
  }

  // Delete To-Do from DB
  await TaskFlow.findByIdAndDelete(taskId );

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Task deleted successfully."));
});

const toggleTask = asyncHandler(async (req, res) => {
  const { taskId } = req.params;

  const task  = await TaskFlow.findById(taskId);
  if (!task) {
    throw new ApiError(404, "Task not found.");
  }

  // Toggle status
  task.isCompleted = !task.isCompleted;
  await task.save();

  return res
    .status(200)
    .json(new ApiResponse(200, task, "Task status updated"));
});

export { createTask, getAllTasks, deleteTask, toggleTask };
