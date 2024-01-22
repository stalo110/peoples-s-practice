import React from "react";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastNotification = () => {
  return (
    <div>
      {" "}
      <ToastContainer
        hideProgressBar
        autoClose={3000}
        transition={Slide}
        enableMultiContainer
        className="toast-message"
        style={{
          width: "auto",
          maxWidth: "80%",
          paddingLeft: "5px",
          zIndex: "9999999999",
        }}
      />
    </div>
  );
};

export default ToastNotification;
