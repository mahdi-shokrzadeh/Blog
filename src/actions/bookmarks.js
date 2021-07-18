import { getBookmarks } from "../services/userService";

export const getUserBookmarks = (token) => {

    return async (dispatch , getState) => {
        const {data} = await getBookmarks(token) ;
        await dispatch({type:"INIT_BOOKMARKS" , payload:data.posts}) ;
    }
    
}