import http from "./httpService";
import config from "./config.json";

export const registerUser = (user) => {
  return http.post(`${config.localHost}/register`, JSON.stringify(user));
};

export const loginUser = (user) => {
  return http.post(`${config.localHost}/login`, JSON.stringify(user));
};

export const logoutUser = (token) => {
  return http.post(`${config.localHost}/logout`, JSON.stringify(token));
};

export const getAllUsers = (token) => {
    
  return http.get(`${config.localHost}/users`, {
    headers: {
      Authorization: `token ${token}`,
    },
  });
};
