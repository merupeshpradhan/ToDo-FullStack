import mongoose, { Schema } from "mongoose";

const todoSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Please write something for your To-Do"],
      trim: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      // Login required to create a task
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const TaskFlow = mongoose.model("TaskFlow", todoSchema);
