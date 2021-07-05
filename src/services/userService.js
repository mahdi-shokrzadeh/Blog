import http from "./httpService";
import config from "./config.json";

export const registerUser = user => {
    return http.post(`${config.localHost}/register` , JSON.stringify(user));
}


export const loginUser = user => {
    return http.post(`${config.localHost}/login` , JSON.stringify(user))
}

export const logoutuser = token => {
    return http.post(`${config.localHost}/logout` , JSON.stringify(token)) ;
}