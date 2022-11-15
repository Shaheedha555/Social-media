import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const { user } = useSelector((state) => state.auth);

  const isRegistered = user ? true : false;
  const isLoggedIn = user?.token ? true : false;
  return isRegistered ? (
    isLoggedIn ? (
      <Outlet />
    ) : (
      <Navigate to={"/verify"} />
    )
  ) : (
    <Navigate to={"/login"} />
  );
};

export default ProtectedRoutes;
