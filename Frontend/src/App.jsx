import { Routes, Route } from "react-router-dom";
import TodoList from "./pages/Home/TodoList";
import Signup from "./pages/signup/Signup";
import Login from "./pages/Login/Login";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<TodoList />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
