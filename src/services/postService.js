import http from "./httpService" ;
import config from "./config.json" ;

export const getPosts = () => {
    return http.get(`${config.localHost}/show`) ;
    
}

export const getPost = (postId) => {
    return http.get(`${config.localHost}/post/${postId}`) ;
}


export const createPost = (post) => {
    return http.post(`${config.localHost}/post` , JSON.stringify(post));
}