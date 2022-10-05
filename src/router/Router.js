import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import Navigation from "../navigation/Navigation";
import ErrorPage from "../pages/ErrorPage";
import { useContext } from "react";
import AuthContext from "../context/auth-context";
import TaskDetail from "../pages/TaskDetail";
import ChangePasswordPage from "../pages/ChangePasswordPage";

function Router() {
const authCtx = useContext(AuthContext);

  /*
  height: 100vh;
  width: 100vw;
  background-color: red;
  */

  return (
    <div className="colorMode">
        <BrowserRouter>
          <Navigation />
          <Routes>     
            <Route path="/" element={!authCtx.isLoggedIn ? <Login /> : <Navigate replace to="/profile" />} />
            <Route path="/profile" element={authCtx.isLoggedIn && <Profile />} />
            <Route path="/change-password" element={authCtx.isLoggedIn && <ChangePasswordPage />} />
            <Route path="/profile/:taskId" element={authCtx.isLoggedIn && <TaskDetail />} />
            <Route path="*" element={<ErrorPage />} />            
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default Router;