import { Routes, Route } from "react-router-dom";
import TodoList from "./pages/Home/TodoList";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/todos" element={<TodoList />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
