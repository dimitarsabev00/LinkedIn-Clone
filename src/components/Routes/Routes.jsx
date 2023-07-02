/* eslint-disable react/prop-types */
import { Navigate, Route, Routes, useLocation } from "react-router";
import Connections from "../../screens/Connections";
import Feed from "../../screens/Feed";
import Login from "../../screens/Login";
import MainPage from "../../screens/MainPage";
import Profile from "../../screens/Profile";
import Register from "../../screens/Register";
import { isAuthenticated } from "../../utilities/helpers";

const RoutesComp = () => {
  const PrivateRoute = ({ children }) => {
    let location = useLocation();
    if (isAuthenticated === false)
      return <Navigate to="/" state={{ from: location }} replace />;
    return children;
  };
  const AuthRoute = ({ children }) => {
    let location = useLocation();
    if (isAuthenticated === true)
      return <Navigate to="/feed" state={{ from: location }} replace />;
    return children;
  };
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthRoute>
            <MainPage />
          </AuthRoute>
        }
      />
      <Route
        path="/login"
        element={
          <AuthRoute>
            <Login />
          </AuthRoute>
        }
      />
      <Route
        path="/register"
        element={
          <AuthRoute>
            <Register />
          </AuthRoute>
        }
      />
      <Route
        path="/feed"
        element={
          <PrivateRoute>
            <Feed />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
      <Route
        path="/connections"
        element={
          <PrivateRoute>
            <Connections />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default RoutesComp;
