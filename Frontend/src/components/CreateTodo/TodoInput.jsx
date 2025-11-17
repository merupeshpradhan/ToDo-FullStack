import axios from "axios";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";

function TodoInput({ onTaskCreated }) {
  const [inputData, setInputData] = useState("");

  const createTask = async (e) => {
    e.preventDefault();

    if (!inputData.trim()) return toast.error("Please enter a task!");

    // create a loading toast
    const toastId = toast.loading("Adding task...");

    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/tasks",
        {
          title: inputData,
        },
        { withCredentials: true }
      );
      console.log("Task Created successfully!", res.data);

      const createdMsg = res.data?.message || "created successfully.";

      toast.update(toastId, {
        render: createdMsg,
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      setInputData("");

      onTaskCreated(res.data.data);
    } catch (error) {
      console.log(error);

      toast.update(toastId, {
        render: "Failed to create To-Do",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="flex gap-3 items-center">
      <input
        type="text"
        value={inputData}
        onChange={(e) => setInputData(e.target.value)}
        placeholder="Add a new task..."
        className="w-[370px] border-2 border-green-600 px-2 py-1 text-lg rounded outline-none tracking-wider font-serif"
      />
      <button
        onClick={createTask}
        className="w-14 h-9 bg-green-600/80 hover:bg-green-600 text-white flex justify-center items-center rounded cursor-pointer transition duration-200 ease-in-out"
      >
        <FaPlus size={18} />
      </button>
    </div>
  );
}

export default TodoInput;
