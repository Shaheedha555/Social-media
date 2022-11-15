import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Alert = () => {
  const { notification } = useSelector((state) => state.chat);
  const [alert, setAlert] = useState({ time: "", message: "" });
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (notification.length > 0) {
      setAlert(notification[notification.length - 1]);
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 5000);
    }
  }, [notification]);

  const onClose = () => {
    setShow(false);
  };

  return show ? (
    <Box
      sx={{
        backgroundColor: "lightgray",
        color: "black",
        width: "auto",
        textAlign: "center",
        padding: "2px 10px",
        position: "fixed",
        right: "50px",
      }}
    >
      <div onClick={onClose}>
        <p>you have new message</p>
      </div>
    </Box>
  ) : null;
};

export default Alert;
