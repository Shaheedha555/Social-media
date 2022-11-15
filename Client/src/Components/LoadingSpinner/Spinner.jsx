import React from "react";
import "./Spinner.scss";

export default function LoadingSpinner({ style }) {
  return (
    <div style={style} className="spinner-container">
      <div className="loading-spinner"></div>
    </div>
  );
}
