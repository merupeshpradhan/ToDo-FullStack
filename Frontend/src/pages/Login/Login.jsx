import { useState } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const userLogin = async (e) => {
    e.preventDefault();

    // Loading toast
    const toastId = toast.loading("Login to To-DO...");
    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/users/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      console.log("Login successfully!", res.data);

      const userData = res.data.data;
      const accessToken = res.data?.accessToken;
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("accessToken", accessToken);

      const successMsg = res.data?.message || "Login success";

      toast.update(toastId, {
        render: successMsg,
        type: "success",
        isLoading: false,
        autoClose: 4000,
        style: { fontSize: "13px" },
      });

      setEmail("");
      setPassword("");
      setShowPassword(false);
      navigate("/taskflow");
    } catch (error) {
      console.log("Login failed.", error);

      const errorMsg =
        error.response?.data?.message || "Login failed. Something went wrong.";

      toast.update(toastId, {
        render: errorMsg,
        type: "error",
        isLoading: false,
        autoClose: 2000,
        style: { fontSize: "13px" },
      });
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-linear-to-t from-fuchsia-400 to-indigo-300
"
    >
      <div className="bg-white p-8 rounded-2xl shadow-lg w-[350px]">
        {/* Top Icon */}
        <div className="flex flex-col items-center justify-center mb-6 gap-1">
          <div className="bg-fuchsia-400 p-4 rounded-full">
            <FaUser className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-transparent bg-clip-text bg-linear-330 from-cyan-600 to-cyan-200 font-bold text-2xl tracking-widest">
            TaskFlow
          </h1>
        </div>

        <form onSubmit={userLogin}>
          {/* Username Email */}
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 px-4 py-2 border border-gray-400 rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />

          {/* Password Input */}
          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-400 rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-2 flex items-center text-[15px] justify-center text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-cyan-400 text-white font-semibold py-2 rounded-full hover:bg-cyan-500 transition-all duration-300 cursor-pointer"
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
