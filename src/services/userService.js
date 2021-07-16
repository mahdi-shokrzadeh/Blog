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
  return http.get(`${config.localHost}/allusers`, {
    headers: {
      Authorization: `token ${token}`,
    },
  });
};

export const editProfile = (data) => {
  return http.put(`${config.localHost}/edituser`, data , {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getUserProfile = (id) => {

  return http.get(`${config.localHost}/getuser/${id}`);
  
}
// get user profile pic
export const getProfilePic = (id) => {
  return `${config.localHost}/pic/${id}` ;
}

/// manager 
export const demoteUser = (userId , token) => {
  return http.put(`${config.localHost}/demote/${userId}`, "" , {
    headers : {
      Authorization : `token ${token}` ,
    }
  });
};

export const promoteUser = (userId , token) => {
  return http.put(`${config.localHost}/promote/${userId}`, "" ,{
    headers : {
      Authorization : `token ${token}` ,
    }
  });
};

export const deleteUser = (userId , token) => {
  return http.delete(`${config.localHost}/kickuser/${userId}` ,{
    headers : {
      Authorization : `token ${token}` ,
    }
  })  
}