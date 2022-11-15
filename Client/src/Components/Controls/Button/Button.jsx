import React from "react";

import "./Button.scss";
function Button(props) {
  return (
    // <div>
    <button
      type="submit"
      className={props.class}
      onClick={props.onclick}
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
      }}
    >
      {props.children}
    </button>
    // </div>
  );
}

export default Button;
