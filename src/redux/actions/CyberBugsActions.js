import {
  USER_SIGNIN_API,
  USER_REGISTER_API,
} from "../constants/Cyberbugs/Cyberbugs";

export const singinCyberbugAction = (email, password) => {
  return {
    type: USER_SIGNIN_API,
    userLogin: {
      email: email,
      password: password,
    },
  };
};

export const registerCyberbugAction = (email, password, name, phoneNumber) => {
  return {
    type: USER_REGISTER_API,
    userRegister: {
      email: email,
      password: password,
      name: name,
      phoneNumber: phoneNumber,
    },
  };
};
