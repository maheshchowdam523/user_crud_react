import {
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  withStyles
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import { UserAPIHandler } from "../../services/user.service";
import Avatar from "@material-ui/core/Avatar";
import { Navbar } from "../common/navbar";
import { format } from "date-fns";
import Box from "@material-ui/core/Box";
import Copyright from "../common/copyright";
import { useHistory } from "react-router-dom";
import DeleteModal from "./deleteModal";

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 700
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
}));

const StyledTableRow = withStyles(theme => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover
    }
  }
}))(TableRow);

const UsersComponent = () => {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState();
  const loggedInUser = history?.location?.state?.user;

  const fetchUsers = async () => {
    const response = await UserAPIHandler.getAllUsers();
    setUsers(response?.data);
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeleteUser = async id => {
    setUserId(id);
    setOpen(true);
  };

  const handleEditUser = id => {
    history.push({
      pathname: `/editUser/${id}`,
      state: {
        user: loggedInUser
      }
    });
  };
  return (
    <>
      <Navbar />
      <Container className={classes.paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Photo</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Date of birth</StyledTableCell>
              <StyledTableCell>Email id</StyledTableCell>
              <StyledTableCell>Phone Number</StyledTableCell>
              <StyledTableCell />
              <StyledTableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.length > 0 ? (
              users.map(user => (
                <>
                  <StyledTableRow key={user._id}>
                    <StyledTableCell component="th" scope="row">
                      <Avatar alt={user.firstName} src={user.avatar} />
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {user.firstName} {user.lastName}
                    </StyledTableCell>
                    <StyledTableCell>
                      {format(new Date(user.birthDate), "dd-MM-yyyy")}
                    </StyledTableCell>
                    <StyledTableCell> {user.email}</StyledTableCell>
                    <StyledTableCell> {user.phone || "--"}</StyledTableCell>
                    <StyledTableCell>
                      <Button
                        color={"primary"}
                        variant="outlined"
                        onClick={() => handleEditUser(user._id)}
                      >
                        Edit
                      </Button>
                    </StyledTableCell>
                    <StyledTableCell>
                      <Tooltip
                        title={
                          user._id !== loggedInUser._id
                            ? ""
                            : "Cannot delete your profile"
                        }
                      >
                        <span>
                          <Button
                            color={"secondary"}
                            variant="contained"
                            onClick={() => handleDeleteUser(user._id)}
                            disabled={user._id === loggedInUser._id}
                          >
                            Delete
                          </Button>
                        </span>
                      </Tooltip>
                    </StyledTableCell>
                  </StyledTableRow>
                </>
              ))
            ) : (
              <StyledTableRow key={"no_data"}>
                <StyledTableCell
                  colSpan={7}
                  height={400}
                  align={"center"}
                  style={{ fontSize: 20 }}
                >
                  No data found
                </StyledTableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </Container>
      {open && (
        <DeleteModal
          open={open}
          id={userId}
          fetchUsers={fetchUsers}
          setOpen={setOpen}
        />
      )}
      <Box mt={5}>
        <Copyright />
      </Box>
    </>
  );
};
export default UsersComponent;
