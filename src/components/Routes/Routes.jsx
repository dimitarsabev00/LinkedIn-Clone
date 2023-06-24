import { Route, Routes } from "react-router";
import Feed from "../../screens/Feed";
import Login from "../../screens/Login";
import MainPage from "../../screens/MainPage";

const RoutesComp = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/feed" element={<Feed />} />
    </Routes>
  );
};

export default RoutesComp;
