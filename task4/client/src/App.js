import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Users from "./components/Users";
import "./App.css";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Users />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default App;
