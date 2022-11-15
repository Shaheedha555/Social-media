import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.scss";
import Protected from "./Protected";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Verify from "./Pages/Verify";
import AdminLogin from "./Pages/Admin/AdminLogin";
import UserManagement from "./Pages/Admin/UserManagement";
import { useSelector } from "react-redux";
import Chat from "./Pages/Chat";
import ProtectedRoutes from "./Routes/ProtectedRoutes";
import PublicRoutes from "./Routes/PublicRoutes";
import PrivateRoutes from "./Routes/PublicRoutes";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/verify" element={<Verify />} />
        </Route>
        <Route element={<PublicRoutes />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route element={<PrivateRoutes />}>
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<UserManagement />} />
        </Route>
      </Routes>
    </div>
  );
  {
    /* <Route
          path="/verify"
          element={
            // <Protected isLoggedIn={isRegistered}>
            isRegistered ? (
              isLoggedIn ? (
                <Navigate to={"/login"} />
              ) : (
                <Verify />
              )
            ) : (
              <Navigate to={"/login"} />
            )
            // </Protected>
          }
        />
        <Route
          path="/chat"
          element={
            <Protected isLoggedIn={isLoggedIn}>
              <Chat />
            </Protected>
          }
        />
        <Route
          path="/register"
          element={isLoggedIn ? <Navigate to={"/"} /> : <Register />}
        />

        <Route
          path="/login"
          element={
            isRegistered ? (
              isLoggedIn ? (
                <Navigate to={"/"} />
              ) : (
                <Navigate to={"/verify"} />
              )
            ) : (
              <Login />
            )
          }
        /> */
  }

  {
    /* <Route
          path="/admin"
          element={
            isAdmin ? <Navigate to={"/admin/dashboard"} /> : <AdminLogin />
          }
        />

        <Route
          path="/admin/dashboard"
          element={isAdmin ? <UserManagement /> : <Navigate to={"/admin"} />}
        />
      </Routes> */
  }
}

export default App;
