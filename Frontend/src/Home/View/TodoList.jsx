
import TodoInput from "../Input/TodoInput";

function TodoList() {
  return (
    <div className="w-full p-5 flex flex-col items-center">
      <div className="">
        <TodoInput />
      </div>
      <div>TodoList</div>
    </div>
  );
}

export default TodoList;
