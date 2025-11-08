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

const deleteTodo = asyncHandler(async (req, res) => {
  const { todoId } = req.params;

  const todo = await Todo.findById(todoId);
  if (!todo) {
    throw new ApiError(401, "To-Do not found.");
  }

  // Delete To-Do from DB
  await Todo.findByIdAndDelete(todoId);

  return res
    .status(201)
    .json(new ApiResponse(201, {}, "To-Do has been successfully deleted."));
});

export { createTodo, deleteTodo };
