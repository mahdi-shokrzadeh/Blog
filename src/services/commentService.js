import http from "./httpService";
import config from "./config.json";

export const createComment = (postId, data , commentId = -1 , name = -1 ) => {

  if (commentId === -1) {
    if(name === -1){
      return http.post(`${config.localHost}/comment/${postId}` , JSON.stringify(data));

    }
  } else {
    if(name === -1){
      return http.post(`${config.localHost}/comment/${postId}/${commentId}` , JSON.stringify(data));

    }else{
      return http.post(`${config.localHost}/comment/${postId}/${commentId}/${name}` , JSON.stringify(data));
    }
  }

};

export const getPendingComments = (token) => {
  return http.get(`${config.localHost}/pendingcomments` , {
    headers:{
      Authorization: `token ${token}`,
    },
  })
}


export const approveComment = (data , commentId) => {
  return http.post(`${config.localHost}/approvecomment/${commentId}` , JSON.stringify(data) )
}


export const deleteComment = (id, token) => {
  return http.delete(`${config.localHost}/deletecomment/${id}`, {
    headers : {
      Authorization : `token ${token}` ,
    }
  });
};