import { getPost } from "../services/postService" ;

export const getSinglePost = (postId) => {
    return async dispatch => {
        const {data} = await getPost(postId);
        await dispatch({type:"GET_POST" , payload: data.post})
    }
}