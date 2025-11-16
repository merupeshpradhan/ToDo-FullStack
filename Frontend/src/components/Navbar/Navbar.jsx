import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    const toastId = toast.loading("Logging out");
    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/users/logout",
        {},
        { withCredentials: true }
      );
      toast.update(toastId, {
        render: "Logged out successfully!",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });

      navigate("/");
    } catch (error) {
      console.log("Logout failed:", error);
      toast.update(toastId, {
        render: "Faild to get Logout",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    }
  };
  return (
    <div className="w-full">
      <nav className="h-[9vh] flex justify-between items-center bg-purple-900 text-white rounded-b-xl px-5 shadow-lg shadow-purple-400/95">
        <h1 className="text-transparent bg-clip-text bg-linear-330 from-cyan-600 to-cyan-200 font-bold text-2xl tracking-wider">
          TaskFlow
        </h1>
        <button
          onClick={handleLogout}
          className="py-1 border-2 border-red-600 w-21 hover:bg-red-600 cursor-pointer hover:text-white tracking-wider font-bold rounded-sm"
        >
          Logout
        </button>
      </nav>
    </div>
  );
}

export default Navbar;
