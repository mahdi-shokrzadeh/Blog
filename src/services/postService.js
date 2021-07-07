import http from "./httpService";
import config from "./config.json";

export const getPosts = () => {
  return http.get(`${config.localHost}/showposts`);
};

export const getPost = (postId , data) => {
  return http.post(`${config.localHost}/singlepost/${postId}` , JSON.stringify(data));
};


export const createPost = (post) => {
  return http.post(`${config.localHost}/post`, post, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getUserPosts = (token) => {
  return http.get(`${config.localHost}/myposts`, {
    headers: {
      Authorization: `token ${token}`,
    },
  });
};

export const getPostImage = (id) => {
  return `${config.localHost}/img/${id}`;
}
