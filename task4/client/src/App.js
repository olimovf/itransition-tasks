import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Users from "./components/Users";
import RequireAuth from "./components/RequireAuth";

const App = () => {
  return (
    <Routes>
      <Route element={<RequireAuth />}>
        <Route path="/" element={<Users />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default App;
