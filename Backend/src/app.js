import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// Frontend Connection
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Import Route for start the website
import userRoutes from "./routes/user.routes.js";
import taskflowRoutes from "./routes/taskflow.routes.js";

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/tasks", taskflowRoutes);

// Import Error Handler
import { errorHandler } from "./middlewares/error.middleware.js";

app.use(errorHandler);

export { app };
