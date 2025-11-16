import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import connectDB from "./Database/index.js";
import { app } from "./app.js";

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`\n Server is running at PORT ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(`\n MongoDB connection failed`, error);
  });
