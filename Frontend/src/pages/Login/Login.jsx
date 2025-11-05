import { useState } from "react";
import { FaEye, FaEyeSlash, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState("");
  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-t from-lime-200 to-cyan-400">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-[350px]">
        {/* Top Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-cyan-400 p-4 rounded-full">
            <FaUser className="w-8 h-8 text-white" />
          </div>
        </div>

        <form>
          {/* Username Email */}
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />

          {/* Password Input */}
          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-2 flex items-center text-[15px] justify-center text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-cyan-400 text-white font-semibold py-2 rounded-full hover:bg-cyan-500 transition-all duration-200 cursor-pointer"
          >
            LOGIN
          </button>
        </form>
        {/* For Signup */}
        <p className="text-center text-gray-600 mt-3 md:mt-5 text-[14px] tracking-wide">
          Don't have an account?
          <Link
            to="/signup"
            className="text-pink-500 md:font-semibold hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
