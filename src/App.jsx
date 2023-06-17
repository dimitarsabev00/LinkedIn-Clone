import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes } from "./components";
import { checkUser } from "./store/slices/generalSlice";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkUser());
  }, []);
  const currentUser = useSelector(({ generalSlice }) => generalSlice.user);
  console.log("currentUser", currentUser);
  return (
    <Router>
      <Routes />
    </Router>
  );
};

export default App;
