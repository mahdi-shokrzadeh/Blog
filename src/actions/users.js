import { getAllUsers } from "../services/userService"

export const getUsers = (token) => {
    return async (dispatch , getState) => {
        const { data } = await getAllUsers(token) ;
        await dispatch({type: "INITUSERS" , payload:data.users });
    }

}