import { Route, Routes } from "react-router";
import Login from "../../screens/Login";

const RoutesComp = () => {
  return (
    <Routes>
      {/* <Route path="/" element={} /> */}
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default RoutesComp;
