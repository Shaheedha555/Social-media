import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.scss";
import Protected from "./Protected";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Verify from "./Pages/Verify";
import AdminLogin from "./Pages/Admin/AdminLogin";
import Dashboard from "./Pages/Admin/Dashboard";
import { useSelector } from "react-redux";
import Chat from "./Pages/Chat";
import axios from "axios";

function App() {
  const item = useSelector((state) => state.auth);
  const user = item.user;

  const isLoggedIn = user?.token ? true : false;
  const isRegistered = user ? true : false;

  const admin = JSON.parse(localStorage.getItem("admin"));
  const isAdmin = admin?.token ? true : false;
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <Protected isLoggedIn={isLoggedIn}>
              <Home />
            </Protected>
          }
        />

        <Route
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
        />

        <Route
          path="/admin"
          element={
            isAdmin ? <Navigate to={"/admin/dashboard"} /> : <AdminLogin />
          }
        />

        <Route
          path="/admin/dashboard"
          element={isAdmin ? <Dashboard /> : <Navigate to={"/admin"} />}
        />
      </Routes>
    </div>
  );
}

export default App;
