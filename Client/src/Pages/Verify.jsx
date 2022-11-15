import React from "react";
import { useSelector } from "react-redux";
import Modal from "../Components/Modal/Modal";

function Verify() {
  const { user } = useSelector((state) => state.auth);
  return (
    // <div>
    <Modal user={user} />
    // </div>
  );
}

export default Verify;
