import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
// const isLoggedIn = user?.token ? true : false;
const PublicRoutes = () => {
  const { user } = useSelector((state) => state.auth);

  const isRegistered = user ? true : false;
  return !isRegistered ? <Outlet /> : <Navigate to={"/"} />;
};

export default PublicRoutes;
