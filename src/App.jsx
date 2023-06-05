import { useSelector } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes } from "./components";

const App = () => {
  const testState = useSelector(({ generalSlice }) => generalSlice.testState);
  console.log(testState);
  return (
    <Router>
      <Routes />
    </Router>
  );
};

export default App;
