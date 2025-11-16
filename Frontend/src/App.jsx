import { Routes, Route } from "react-router-dom";
import TaskFlowList from "./pages/Home/TaskFlowList";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/taskflow" element={<TaskFlowList />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
