import { getPost } from "../services/postService" ;

export const getSinglePost = (postId , token) => {
    return async dispatch => {
        const {data} = await getPost(postId , token);
        await dispatch({type:"GET_POST" , payload: data.post});
    }
}

export const likePost = () => {

    return async (dispatch , getState) => {
        const post = {...getState().post};
        console.log(post)
        const is_liked = post.is_liked ;
        if(is_liked === true){
            post.likes -= 1
        }else{
            post.likes += 1
        }
        post.is_liked = !is_liked ;
        await dispatch({type:"LIKE_POST" , payload : post})
    }

}