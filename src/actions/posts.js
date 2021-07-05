import { getPosts } from "../services/postService"

export const getAllPosts = () => {

    return async (dispatch , getState) => {
        const {data} = await getPosts() ;
        await dispatch({type:"INIT" , payload:data.posts}) ;
    }
    
}