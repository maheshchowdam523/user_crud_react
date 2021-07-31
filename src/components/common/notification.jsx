import { Snackbar, SnackbarContent } from "@material-ui/core";
import React, { useState } from "react";

const Notification = ({ message, color, updateMessage }) => {
  const [state, setState] = useState({
    open: message.length > 0,
    vertical: "top",
    horizontal: "center"
  });

  const { vertical, horizontal, open } = state;

  const handleClose = () => {
    setState({ ...state, open: false });
    updateMessage("");
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      onClose={handleClose}
      message={message}
      key={vertical + horizontal}
    >
      <SnackbarContent
        style={{
          backgroundColor: color, //"#f50057"
          color: "#fff"
        }}
        message={message}
      />
    </Snackbar>
  );
};

export default Notification;
