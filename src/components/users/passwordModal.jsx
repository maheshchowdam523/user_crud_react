import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { UserAPIHandler } from "../../services/user.service";
import { Typography } from "@material-ui/core";

const PasswordModal = ({
  currentPassword,
  id,
  updateMessage,
  setOpen,
  open
}) => {
  const [password, updatePassword] = useState("");
  const [newPassword, updateNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = async () => {
    let errorString = "";
    if (currentPassword === newPassword) {
      errorString = "Existing password cannot be used as new password";
      setMessage(errorString);
    } else if (currentPassword === password) {
      errorString = "Please enter the current password";
      setMessage(errorString);
    } else if (newPassword !== confirmPassword) {
      errorString = "Password should match while updating";
      setMessage(errorString);
    }
    if (errorString.length === 0) {
      setOpen(false);
      const res = await UserAPIHandler.updatePassword(id, { newPassword });
      if (res.status === 200) {
        updateMessage("Password updated successfully");
      } else {
        updateMessage(res.data.message);
      }
    }
  };
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Change password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter your current and future password to change here.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            type="password"
            label="Current Password"
            fullWidth
            required
            onChange={e => updatePassword(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="New Password"
            type="password"
            fullWidth
            required
            onChange={e => updateNewPassword(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Confirm Password"
            type="password"
            fullWidth
            required
            onChange={e => setConfirmPassword(e.target.value)}
          />
          {message && <Typography color={"error"}>{message}</Typography>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirm} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PasswordModal;
