import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Copyright from "../common/copyright";
import "date-fns";
import { Link as RouterLink, useHistory } from "react-router-dom";
import Datepicker from "../common/datepicker";
import { IconButton, Tooltip } from "@material-ui/core";
import { PhotoCamera } from "@material-ui/icons";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { UserAPIHandler } from "../../services/user.service";
import { Navbar } from "../common/navbar";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
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

const SignUp = () => {
  const classes = useStyles();
  const [user, updateUser] = useState();
  const history = useHistory();
  const variant = history?.location?.state?.variant || "signup";
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
    await UserAPIHandler.createUser(user);
    history.push(
      variant === "userDetails"
        ? { pathname: "/users", state: { user: loggedInUser } }
        : { pathname: "/login" }
    );
  };
  return (
    <>
      {variant === "userDetails" && <Navbar />}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            {variant === "userDetails" ? (
              <AccountCircle />
            ) : (
              <LockOutlinedIcon />
            )}
          </Avatar>
          <Typography component="h1" variant="h5">
            {variant === "userDetails" ? "Add User" : "Sign up"}
          </Typography>
          <Grid container spacing={2} className={classes.form}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={e => handleChange("firstName", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
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
                variant="outlined"
                fullWidth
                id="phoneNumber"
                label="Phone number"
                name="phoneNumber"
                autoComplete="phoneNum"
                onChange={e => handleChange("phone", e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                type="email"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={e => handleChange("email", e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={e => handleChange("password", e.target.value)}
              />
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
            {variant === "signup" && (
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="Agree to the Privacy Policy"
                />
              </Grid>
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleClick}
          >
            {variant === "userDetails" ? "Add User" : "Sign up"}
          </Button>
          {variant === "signup" && (
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link component={RouterLink} variant="body2" to="login">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          )}
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    </>
  );
};

export default SignUp;
