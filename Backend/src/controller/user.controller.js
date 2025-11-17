import { User } from "../models/user.schema.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const userSignup = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;

  if (!userName || !email || !password) {
    throw new ApiError(401, "All fields are required.");
  }

  const findEmail = await User.findOne({ email });
  if (findEmail) {
    throw new ApiError(401, "The email you entered already exists.");
  }

  //   Createing user
  let user = await User.create({ userName, email, password });

  //   Save the user to DB
  await user.save();

  const userData = {
    id: user._id,
    userName: user.userName,
    email: user.email,
  };

  return res
    .status(201)
    .json(
      new ApiResponse(201, userData, "Welcome to TaskFlow, User!")
    );
});

const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(401, "Please provide your email and password.");
  }

  //   find user
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(401, "This email is not registered.");
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new ApiError(401, "Oops! The password you entered is incorrect.");
  }

  const accessToken = await user.generateAccessToken();
  const refreshToken = await user.generateRefreshToken();

  const option = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  };

  res.cookie("accessToken", accessToken, option);
  res.cookie("refreshToken", refreshToken, option);

  const userData = {
    id: user._id,
    userName: user.userName,
    email: user.email,
  };

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        userData,
        `Hello ${userData.userName}, Welcome to TaskFlow`
      )
    );
});

const userLogout = asyncHandler(async (req, res) => {
  const userName = req.user?.userName || "user";

  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");

  return res
    .status(201)
    .json(
      new ApiResponse(201, {}, `Goodbye for now, ${userName}! Come back soon.`)
    );
});

export { userSignup, userLogin, userLogout };
