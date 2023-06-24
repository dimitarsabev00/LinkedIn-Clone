import { Route, Routes } from "react-router";
import Feed from "../../screens/Feed";
import Login from "../../screens/Login";
import MainPage from "../../screens/MainPage";
import Register from "../../screens/Register";

const RoutesComp = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/feed" element={<Feed />} />
    </Routes>
  );
};

export default RoutesComp;
