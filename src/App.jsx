import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes } from "./components";
import { checkUser } from "./store/slices/generalSlice";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkUser());
  }, []);

  return (
    <Router>
      <Routes />
    </Router>
  );
};

export default App;
