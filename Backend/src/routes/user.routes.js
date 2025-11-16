import { Router } from "express";
import {
  userSignup,
  userLogin,
  userLogout,
} from "../controller/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/signup").post(userSignup);
router.route("/login").post(userLogin);
router.route("/logout").post(authMiddleware, userLogout);

export default router;
