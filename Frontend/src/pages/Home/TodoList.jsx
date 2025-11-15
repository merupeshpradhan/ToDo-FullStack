import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import TodoInput from "../../components/CreateTodo/TodoInput";
import Navbar from "../../components/Navbar/Navbar.jsx";

function TodoList() {
  const [loading, setLoading] = useState(false);
  const [Todos, setTodos] = useState([]);
  const navigate = useNavigate();
  const [checkedTodos, setCheckedTodos] = useState({});

  useEffect(() => {
    const fetchTodo = async () => {
      const toastId = toast.loading("Fetching To-Do...");

      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          toast.error("Please log in first!");
          navigate("/");
          return;
        }

        const res = await axios.get("http://localhost:4000/api/v1/todo", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        console.log("All Todo", res);

        if (res.data.data) {
          setTodos(res.data.data);
        } else {
          setTodos([]);
        }

        toast.update(toastId, {
          render: "Fetched To-Do successfully!",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
      } catch (error) {
        console.log("Failed to get To-Do", error);
        toast.update(toastId, {
          render: "Failed to get To-Do",
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });
      }
    };

    fetchTodo();
  }, []);

  const toggleCheck = (id) => {
    setCheckedTodos((prev) => ({
      ...prev,
      [id]: !prev[id], // toggle true/false
    }));
  };

  const deleteTodo = async (todoId) => {
    // create a loading toast
    const toastId = toast.loading("Deleting To-Do...");

    const token = localStorage.getItem("accessToken");

    try {
      const res = await axios.delete(
        `http://localhost:4000/api/v1/todo/${todoId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      console.log("To-Do list deleted successfully", res.data);

      toast.update(toastId, {
        render: "To-Do list deleted successfully!",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });

      // remove from UI
      setTodos((prev) => prev.filter((todo) => todo._id !== todoId));
    } catch (error) {
      console.log("Delete failed:", error);

      toast.update(toastId, {
        render: "Faild to delete To-Do",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="all-field bg-purple-100">
      <div className="mb-5">
        <Navbar />
      </div>
      <div className="p-5 flex flex-col items-center">
        <div className="flex justify-center items-center flex-col">
          <TodoInput />
        </div>
        <div className="mt-5 w-[30%] border-2 border-yellow-500 h-[74vh] rounded-md overflow-y-auto">
          {Todos.map((todo) => (
            <div className="border-2 border-green-500 p-2 rounded-sm flex items-center justify-between gap-5 my-4 mx-5">
              <h1 className="text-md tracking-wide font-semibold break-all">
                {todo.title}
              </h1>
              <div className="flex items-center gap-3">
                <div
                  className={`border w-5 h-5 flex items-center justify-center rounded cursor-pointer ${
                    checkedTodos[todo._id]
                      ? "bg-green-600 text-white"
                      : "text-green-600"
                  }`}
                  onClick={() => toggleCheck(todo._id)}
                >
                  {checkedTodos[todo._id] && <FaCheck size={13} />}
                </div>
                <div
                  onClick={() => deleteTodo(todo._id)}
                  className="text-red-600 cursor-pointer"
                >
                  <MdDelete size={23} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TodoList;
