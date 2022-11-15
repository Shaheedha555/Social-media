import React from "react";
import { Navigate, Outlet } from "react-router-dom";
const admin = JSON.parse(localStorage.getItem("admin"));
const isAdmin = admin?.token ? true : false;
const PrivateRoutes = () => {
  return isAdmin ? <Outlet /> : <Navigate to={"/admin"} />;
};

export default PrivateRoutes;
