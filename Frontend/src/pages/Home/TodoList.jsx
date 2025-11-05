import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import TodoInput from "../../components/Input/TodoInput";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";

function TodoList() {
  const [loading, setLoading] = useState(false);
  const userId = "123";
  const toDoListId = "456";

  const deleteTodo = async (e) => {
    e.preventDefault();

    // create a loading toast
    const toastId = toast.loading("Deleting To-Do...");

    try {
      const res = await axios.delete(
        `http://localhost:4000/api/v1/user/${userId}/${toDoListId}`
      );

      console.log("To-Do list deleted successfully", res.data);

      toast.update(toastId, {
        render: "To-Do list deleted successfully!",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
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
    <div className="p-5 flex flex-col items-center">
      <div className="flex justify-center">
        <TodoInput />
      </div>
      <div className="mt-10 w-[30%] h-[70vh] border rounded-md overflow-y-auto ">
        <div className="border-2 p-2 rounded-sm flex items-center justify-between gap-5 my-4 mx-5">
          <h1 className="text-md tracking-wide font-semibold break-all">
            1PM Go to Kuchinda
          </h1>
          <div className="flex items-center gap-3">
            <div className="border w-6 h-5 text-green-600 flex items-center justify-center rounded cursor-pointer">
              <FaCheck size={15} />
            </div>
            <div onClick={deleteTodo} className="text-red-600 cursor-pointer">
              <MdDelete size={23} />
            </div>
          </div>
        </div>
        <div className="border-2 p-2 rounded-sm flex items-center justify-between gap-5 my-4 mx-5">
          <h1 className="text-md tracking-wide font-semibold break-all">
            1PM Go to Kuchinda
            hfufuryfuufyiirioueqorfioefiohfhrfhuioerhfojerkljfoiryhuifrkerjhfguierhgklrjguirgkrjgiokjgkherjkwhgklrgjklhjklgjklhrwejklghwrgl
          </h1>
          <div className="flex items-center gap-3">
            <div className="border w-6 h-5 text-green-600 flex items-center justify-center rounded cursor-pointer">
              <FaCheck size={15} />
            </div>
            <div onClick={deleteTodo} className="text-red-600 cursor-pointer">
              <MdDelete size={23} />
            </div>
          </div>
        </div>
        <div className="border-2 p-2 rounded-sm flex items-center justify-between gap-5 my-4 mx-5">
          <h1 className="text-md tracking-wide font-semibold break-all">
            1PM Go to Kuchinda
          </h1>
          <div className="flex items-center gap-3">
            <div className="border w-6 h-5 text-green-600 flex items-center justify-center rounded cursor-pointer">
              <FaCheck size={15} />
            </div>
            <div onClick={deleteTodo} className="text-red-600 cursor-pointer">
              <MdDelete size={23} />
            </div>
          </div>
        </div>
        <div className="border-2 p-2 rounded-sm flex items-center justify-between gap-5 my-4 mx-5">
          <h1 className="text-md tracking-wide font-semibold break-all">
            1PM Go to Kuchinda
          </h1>
          <div className="flex items-center gap-3">
            <div className="border w-6 h-5 text-green-600 flex items-center justify-center rounded cursor-pointer">
              <FaCheck size={15} />
            </div>
            <div onClick={deleteTodo} className="text-red-600 cursor-pointer">
              <MdDelete size={23} />
            </div>
          </div>
        </div>
        <div className="border-2 p-2 rounded-sm flex items-center justify-between gap-5 my-4 mx-5">
          <h1 className="text-md tracking-wide font-semibold break-all">
            1PM Go to Kuchinda
          </h1>
          <div className="flex items-center gap-3">
            <div className="border w-6 h-5 text-green-600 flex items-center justify-center rounded cursor-pointer">
              <FaCheck size={15} />
            </div>
            <div onClick={deleteTodo} className="text-red-600 cursor-pointer">
              <MdDelete size={23} />
            </div>
          </div>
        </div>
        <div className="border-2 p-2 rounded-sm flex items-center justify-between gap-5 my-4 mx-5">
          <h1 className="text-md tracking-wide font-semibold break-all">
            1PM Go to Kuchinda
          </h1>
          <div className="flex items-center gap-3">
            <div className="border w-6 h-5 text-green-600 flex items-center justify-center rounded cursor-pointer">
              <FaCheck size={15} />
            </div>
            <div onClick={deleteTodo} className="text-red-600 cursor-pointer">
              <MdDelete size={23} />
            </div>
          </div>
        </div>
        <div className="border-2 p-2 rounded-sm flex items-center justify-between gap-5 my-4 mx-5">
          <h1 className="text-md tracking-wide font-semibold break-all">
            1PM Go to Kuchinda
          </h1>
          <div className="flex items-center gap-3">
            <div className="border w-6 h-5 text-green-600 flex items-center justify-center rounded cursor-pointer">
              <FaCheck size={15} />
            </div>
            <div onClick={deleteTodo} className="text-red-600 cursor-pointer">
              <MdDelete size={23} />
            </div>
          </div>
        </div>
        <div className="border-2 p-2 rounded-sm flex items-center justify-between gap-5 my-4 mx-5">
          <h1 className="text-md tracking-wide font-semibold break-all">
            1PM Go to Kuchinda
          </h1>
          <div className="flex items-center gap-3">
            <div className="border w-6 h-5 text-green-600 flex items-center justify-center rounded cursor-pointer">
              <FaCheck size={15} />
            </div>
            <div onClick={deleteTodo} className="text-red-600 cursor-pointer">
              <MdDelete size={23} />
            </div>
          </div>
        </div>
        <div className="border-2 p-2 rounded-sm flex items-center justify-between gap-5 my-4 mx-5">
          <h1 className="text-md tracking-wide font-semibold break-all">
            1PM Go to Kuchinda
          </h1>
          <div className="flex items-center gap-3">
            <div className="border w-6 h-5 text-green-600 flex items-center justify-center rounded cursor-pointer">
              <FaCheck size={15} />
            </div>
            <div onClick={deleteTodo} className="text-red-600 cursor-pointer">
              <MdDelete size={23} />
            </div>
          </div>
        </div>
        <div className="border-2 p-2 rounded-sm flex items-center justify-between gap-5 my-4 mx-5">
          <h1 className="text-md tracking-wide font-semibold break-all">
            1PM Go to Kuchinda
          </h1>
          <div className="flex items-center gap-3">
            <div className="border w-6 h-5 text-green-600 flex items-center justify-center rounded cursor-pointer">
              <FaCheck size={15} />
            </div>
            <div onClick={deleteTodo} className="text-red-600 cursor-pointer">
              <MdDelete size={23} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodoList;
