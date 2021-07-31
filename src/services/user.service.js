import axios from "axios";
import { USERS } from "./constants";
import FormData from "form-data";

const createUser = async payload => {
  let data = new FormData();
  Object.keys(payload).forEach(key => {
    data.append(key, payload[key]);
  });
  try {
    return await axios.post(USERS, data, {
      headers: {
        accept: "application/json",
        "Accept-Language": "en-US,en;q=0.8",
        "content-type": "multipart/form-data"
      }
    });
  } catch (err) {
    console.log("error", err.response);
    return err.response;
  }
};

const updateUser = async (id, payload) => {
  let data = new FormData();
  Object.keys(payload).forEach(key => {
    data.append(key, payload[key]);
  });
  try {
    return await axios.put(`${USERS}/${id}`, data, {
      headers: {
        accept: "application/json",
        "Accept-Language": "en-US,en;q=0.8",
        "Content-Type": `multipart/form-data; boundary=${data._boundary}`
      }
    });
  } catch (err) {
    console.log("error", err.response);
    return err.response;
  }
};

const deleteUser = async id => {
  try {
    return await axios.delete(`${USERS}/${id}`);
  } catch (err) {
    console.log("error", err.response);
    return err.response;
  }
};

const updatePassword = async (id, payload) => {
  try {
    return await axios.patch(`${USERS}/${id}/updatePassword`, payload);
  } catch (err) {
    console.log("error", err.response);
    return err.response;
  }
};

const getAllUsers = async () => {
  try {
    return await axios.get(USERS);
  } catch (err) {
    console.log("error", err.response);
    return err.response;
  }
};

const getUserById = async id => {
  try {
    return await axios.get(`${USERS}/${id}`);
  } catch (err) {
    console.log("error", err.response);
    return err.response;
  }
};
export const UserAPIHandler = {
  createUser,
  updateUser,
  updatePassword,
  deleteUser,
  getAllUsers,
  getUserById
};
