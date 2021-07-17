import http from "./httpService";
import config from "./config.json";

export const getPosts = () => {
  return http.get(`${config.localHost}/showposts`);
};

export const getPost = (postId, token) => {
  return http.get(`${config.localHost}/singlepost/${postId}`, {
    headers: {
      Authorization: `token ${token}`,
    },
  });
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
};


export const deletePost = (id, token) => {
  return http.delete(`${config.localHost}/deletepost/${id}`, {
    headers : {
      Authorization : `token ${token}` ,
    }
  });
};


export const handlelikePost = (id , data) => {
  return http.post(`${config.localHost}/like/${id}` , JSON.stringify(data) );
}


export const searchPosts = (query) => {
  return http.post(`${config.localHost}/tagedposts` , JSON.stringify({
    tag: query
  }));
}


/// admin 

export const pendingPosts = (token) => {
  return http.get(`${config.localHost}/pendingposts` , {
    headers : {
      Authorization : `token ${token}` ,
    }
  })
}

export const approvePost = (data , postId) => {
  return http.post(`${config.localHost}/approvepost/${postId}` , JSON.stringify(data) )
}


// edit post
export const editPost = (post , postId) => {
  return http.put(`${config.localHost}/editpost/${postId}`, post, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};