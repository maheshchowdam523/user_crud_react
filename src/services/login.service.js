import axios from "axios";
import { LOGIN } from "./constants";

const validateUser = async ({ username, password }) => {
  try {
    return await axios.post(LOGIN, {
      username,
      password
    });
  } catch (err) {
    return err.response;
  }
};

export const LoginAPIHandler = {
  validateUser
};
