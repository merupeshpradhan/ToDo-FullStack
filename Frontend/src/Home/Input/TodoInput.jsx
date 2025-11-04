import { FaPlus } from "react-icons/fa";

function TodoInput() {
  return (
    <div className="flex gap-3 items-center">
      <input
        type="text"
        placeholder="Add a new task..."
        className="border pl-2 pr-20 py-1 text-lg rounded"
      />
      <button className="w-11 h-8 bg-green-500 hover:bg-green-600 text-white flex justify-center items-center rounded cursor-pointer">
        <FaPlus size={18} />
      </button>
    </div>
  );
}

export default TodoInput;
