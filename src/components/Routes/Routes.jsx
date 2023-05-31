import { Route, Routes } from "react-router";
import Home from "../../screens/Home";
import Login from "../../screens/Login";

const RoutesComp = () => {
  return (
    <Routes>
      <Route path="/feed" element={<Home />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default RoutesComp;
