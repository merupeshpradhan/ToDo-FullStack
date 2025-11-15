import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Todo } from "../models/todo.schema.js";

const createTodo = asyncHandler(async (req, res) => {
  const { title } = req.body;

  if (!title || title.trim() === "") {
    throw new ApiError(401, "Please write something for your To-Do.");
  }

  const todo = await Todo.create({ title, user: req.user._id });

  return res
    .status(201)
    .json(new ApiResponse(201, todo, "Successfully created Todo."));
});

const getAllTodos = asyncHandler(async (req, res) => {
  const todos = await Todo.find({ user: req.user._id }).sort({
    createdAt: -1,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, todos, "Fetched all To-Dos Successfully."));
});

const toggleTodo = asyncHandler(async (req, res) => {
  const { todoId } = req.params;

  const todo = await Todo.findById(todoId);
  if (!todo) {
    throw new ApiError(404, "To-Do not found.");
  }

  // Toggle status
  todo.isCompleted = !todo.isCompleted;
  await todo.save();

  return res
    .status(200)
    .json(new ApiResponse(200, todo, "Todo status updated"));
});

const deleteTodo = asyncHandler(async (req, res) => {
  const { todoId } = req.params;

  const todo = await Todo.findById(todoId);
  if (!todo) {
    throw new ApiError(404, "To-Do not found.");
  }

  // Delete To-Do from DB
  await Todo.findByIdAndDelete(todoId);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "To-Do has been successfully deleted."));
});

export { createTodo, getAllTodos, deleteTodo, toggleTodo };
