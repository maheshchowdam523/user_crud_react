import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Copyright from "../common/copyright";
import "date-fns";
import Datepicker from "../common/datepicker";
import { IconButton, Tooltip } from "@material-ui/core";
import { PhotoCamera } from "@material-ui/icons";
import { UserAPIHandler } from "../../services/user.service";
import { Navbar } from "../common/navbar";
import Avatar from "@material-ui/core/Avatar";
import Notification from "../common/notification";
import PasswordModal from "./passwordModal";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(10),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  input: {
    display: "none"
  },
  faceImage: {
    color: theme.palette.primary.light
  }
}));

const UserDetails = ({ match }) => {
  const classes = useStyles();
  const history = useHistory();
  const [user, updateUser] = useState();
  const [message, updateMessage] = useState("");
  const [open, setOpen] = useState(false);
  const loggedInUser = history?.location?.state?.user;

  const handleChange = (field, value) => {
    let tempUser = { ...user };
    tempUser[field] = value;
    updateUser(tempUser);
  };

  const [selectedFile, setSelectedFile] = useState(null);

  const handleCapture = ({ target }) => {
    setSelectedFile(target.files[0]);
    const tempUser = { ...user, image: target.files[0] };
    updateUser(tempUser);
  };
  const handleClick = async () => {
    const response = await UserAPIHandler.updateUser(match.params.id, user);
    if (response.status === 200) {
      updateMessage("User Details updated successfully");
    } else {
      updateMessage(response?.data?.message);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const res = await UserAPIHandler.getUserById(match.params.id);
      updateUser(res.data);
    };
    fetchUser();
  }, [match.params.id]);

  return (
    <>
      <Navbar />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar
            alt={user?.firstName}
            src={user?.avatar}
            className={classes.avatar}
          />
          <Typography component="h1" variant="h5">
            Edit User
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={user?.firstName || ""}
                InputLabelProps={{ shrink: true }}
                onChange={e => handleChange("firstName", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="lastName"
                value={user?.lastName || ""}
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                InputLabelProps={{ shrink: true }}
                onChange={e => handleChange("lastName", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Datepicker
                date={user?.birthDate}
                handleChange={handleChange}
                label={"Date of birth"}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="phoneNumber"
                label="Phone number"
                value={user?.phone || ""}
                name="phoneNumber"
                autoComplete="phoneNum"
                InputLabelProps={{ shrink: true }}
                onChange={e => handleChange("phone", e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                value={user?.email || ""}
                label="Email Address"
                name="email"
                autoComplete="email"
                InputLabelProps={{ shrink: true }}
                onChange={e => handleChange("email", e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Tooltip
                title={"Logged in user cannot change other people's password"}
              >
                <span>
                  <Button
                    color={"secondary"}
                    type={"button"}
                    variant={"contained"}
                    onClick={() => setOpen(true)}
                    disabled={user?._id !== loggedInUser?._id}
                  >
                    Change Password
                  </Button>
                </span>
              </Tooltip>
            </Grid>
            <Grid item xs={12}>
              <input
                accept="image/jpeg, image/png, image/jpg"
                className={classes.input}
                id="faceImage"
                type="file"
                onChange={handleCapture}
              />
              <Tooltip title="Select Image">
                <label htmlFor="faceImage">
                  <IconButton
                    className={classes.faceImage}
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                  >
                    <PhotoCamera fontSize="large" />
                  </IconButton>
                </label>
              </Tooltip>
              <label>{selectedFile ? selectedFile.name : "Select Image"}</label>
              . . .
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleClick}
          >
            Update User
          </Button>
        </div>
        {message && (
          <Notification
            color={!message.includes("Failed") ? "#4e9707" : "#f50057"}
            message={message}
            updateMessage={updateMessage}
          />
        )}
        {open && (
          <PasswordModal
            id={user?._id}
            currentPassword={user?.password}
            updateMessage={updateMessage}
            setOpen={setOpen}
            open={open}
          />
        )}
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    </>
  );
};

export default UserDetails;
