import { useState, useEffect } from "react";
import { FaCheck } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import TodoInput from "../../components/CreateTodo/TodoInput.jsx";
import Navbar from "../../components/Navbar/Navbar.jsx";

function TaskFlowList() {
  const [Tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      const toastId = toast.loading("Fetching Stack...");

      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          toast.error("Please log in first!");
          navigate("/");
          return;
        }

        const res = await axios.get("http://localhost:4000/api/v1/tasks", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        console.log("All Tasks", res);

        if (res.data.data) {
          setTasks(res.data.data);
        } else {
          setTasks([]);
        }

        toast.update(toastId, {
          render: "Tasks fetched successfully!",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
      } catch (error) {
        console.log("Failed to get Tasks", error);
        toast.update(toastId, {
          render: "Unable to fetch tasks",
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });
      }
    };

    fetchTasks();
  }, []);

  // Add the newly created todo to the list
  const addNewTaskToList = (newTask) => {
    setTasks((prev) => [newTask, ...prev]);
  };

  const toggleCheck = async (id) => {
    const token = localStorage.getItem("accessToken");

    const toastId = toast.loading("Task completed or not...");

    try {
      const res = await axios.put(
        `http://localhost:4000/api/v1/tasks/${id}/toggle`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      const updatedTask = res.data.data;

      setTasks((prev) =>
        prev.map((task) => (task._id === id ? updatedTask : task))
      );

      if (updatedTask.isCompleted) {
        toast.update(toastId, {
          render: "Task completed.",
          type: "success",
          isLoading: false,
          autoClose: 2500,
        });
      } else {
        toast.update(toastId, {
          render: "Task not completed.",
          type: "info",
          isLoading: false,
          autoClose: 2500,
        });
      }
    } catch (error) {
      console.log("Toggle failed", error);
    }
  };

  const deleteTask = async (taskId) => {
    // create a loading toast
    const toastId = toast.loading("Deleting To-Do...");

    const token = localStorage.getItem("accessToken");

    try {
      const res = await axios.delete(
        `http://localhost:4000/api/v1/tasks/${taskId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      console.log("Task list deleted successfully", res.data);

      const deletedMsg = res.data?.message || "Deleted successfully";

      toast.update(toastId, {
        render: deletedMsg,
        type: "success",
        isLoading: false,
        autoClose: 2500,
      });

      // remove from UI
      setTasks((prev) => prev.filter((task) => task._id !== taskId));
    } catch (error) {
      console.log("Delete failed:", error);

      toast.update(toastId, {
        render: "Faild to delete Task",
        type: "error",
        isLoading: false,
        autoClose: 2500,
      });
    }
  };

  return (
    <div className="all-field bg-purple-100">
      <div className="mb-5">
        <Navbar />
      </div>
      <div className="h-[88vh] pt-4 flex flex-col items-center">
        <div className="flex justify-center items-center flex-col">
          <TodoInput onTaskCreated={addNewTaskToList} />
        </div>
        <div
          className="mt-5 w-[30%] border-2 border-yellow-500 h-[74vh] rounded-md overflow-y-auto
            [&::-webkit-scrollbar]:w-1.5
            [&::-webkit-scrollbar-track]:bg-gray-200 [&::-webkit-scrollbar-track]:rounded-md
            [&::-webkit-scrollbar-thumb]:bg-green-500 [&::-webkit-scrollbar-thumb]:rounded-md"
        >
          {Tasks.map((task) => (
            <div
              key={task._id}
              className={`p-2 rounded-sm flex items-center justify-between gap-5 my-4 mx-5 border-2 ${
                task.isCompleted ? "border-green-500" : "border-red-500"
              }`}
            >
              <h1 className="text-md tracking-wide font-semibold break-all">
                {task.title}
              </h1>
              <div className="flex items-center gap-3">
                <div
                  className={`border w-5 h-5 flex items-center justify-center rounded cursor-pointer ${
                    task.isCompleted
                      ? "bg-green-600 text-white"
                      : "text-green-600"
                  }`}
                  onClick={() => toggleCheck(task._id)}
                >
                  {task.isCompleted && <FaCheck size={13} />}
                </div>

                <div
                  onClick={() => deleteTask(task._id)}
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

export default TaskFlowList;
