import { Navbar } from "../common/navbar";
import React, { useEffect, useState } from "react";
import { UserAPIHandler } from "../../services/user.service";
import { useHistory } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { CalendarToday, Email, Phone } from "@material-ui/icons";
import Grid from "@material-ui/core/Grid";
import { format } from "date-fns";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(10),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    width: theme.spacing(20),
    height: theme.spacing(20)
  }
}));

const Profile = () => {
  const classes = useStyles();
  const history = useHistory();
  const loggedInUser = history?.location?.state?.user;
  const [user, updateUser] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      const res = await UserAPIHandler.getUserById(loggedInUser?._id);
      updateUser(res.data);
    };
    fetchUser();
  }, [loggedInUser]);
  return (
    <>
      <Navbar />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar
            variant={"square"}
            alt={user?.firstName}
            src={user?.avatar}
            className={classes.avatar}
          />
          <Typography variant={"h4"} gutterBottom>
            {user?.firstName} {user?.lastName}
          </Typography>

          <Grid container className={classes.root}>
            <Grid item xs={2}>
              <Email color={"primary"} style={{ fontSize: 30 }} />
            </Grid>
            <Grid item xs={10}>
              <Typography style={{ fontWeight: 700, fontSize: 20 }}>
                {user?.email}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Phone color={"primary"} style={{ fontSize: 30 }} />
            </Grid>
            <Grid item xs={10}>
              <Typography style={{ fontWeight: 700, fontSize: 20 }}>
                {user?.phone || "-"}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <CalendarToday color={"primary"} style={{ fontSize: 30 }} />
            </Grid>
            <Grid item xs={10}>
              <Typography style={{ fontWeight: 700, fontSize: 20 }}>
                {(user?.birthDate &&
                  format(new Date(user?.birthDate), "dd-MM-yyyy")) ||
                  "-"}
              </Typography>
            </Grid>
          </Grid>
        </div>
      </Container>
    </>
  );
};
export default Profile;
