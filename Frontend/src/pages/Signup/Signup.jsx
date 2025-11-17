import axios from "axios";
import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaUserPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Signup() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const userSignup = async (e) => {
    e.preventDefault();

    // Loading toast
    const toastId = toast.loading("SignUp for To-Do...");

    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/users/signup",
        {
          userName,
          email,
          password,
        },
        { withCredentials: true }
      );

      const successMsg =
        res.data?.message || "Signup successful! Please login.";

      toast.update(toastId, {
        render: successMsg,
        type: "success",
        isLoading: false,
        autoClose: 3000,
        style: { fontSize: "14px" },
      });

      setUserName("");
      setEmail("");
      setPassword("");
      navigate("/");
    } catch (error) {
      console.log("for Signup somthing went wrong.", error);

      const errorMsg =
        error.response?.data?.message ||
        "Something went wrong while signing up.";

      toast.update(toastId, {
        render: errorMsg,
        type: "error",
        isLoading: false,
        autoClose: 3000,
        style: { fontSize: "14px" },
      });
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-t from-indigo-400 to-pink-300">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-[350px]">
        {/* Top Icon */}
        <div className="flex flex-col items-center justify-center mb-6 gap-1">
          <div className="bg-indigo-400 p-4 rounded-full">
            <FaUserPlus className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-transparent bg-clip-text bg-linear-330 from-cyan-600 to-cyan-200 font-bold text-2xl tracking-widest">
            TaskFlow
          </h1>
        </div>

        <form onSubmit={userSignup}>
          {/* Full Name */}
          <input
            type="text"
            placeholder="Full Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          {/* Password */}
          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-2 flex items-center text-[15px] justify-center text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            className="w-full bg-indigo-400 text-white font-semibold py-2 rounded-full hover:bg-indigo-500 transition-all duration-300 cursor-pointer"
          >
            SIGN UP
          </button>
        </form>

        {/* For Login */}
        <p className="text-center text-gray-600 mt-3 md:mt-5 text-[14px] tracking-wide">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-green-500 md:font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
