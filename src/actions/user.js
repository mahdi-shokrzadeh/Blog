export const addUser = (user) => {
  return async (dispatch) => {
    await dispatch({ type: "SET_USER", payload: user });
  };
};

export const clearUser = () => {
  return async (dispatch) => {
    await dispatch({ type: "CLEAR_USER", payload: {} });
  };
};

export const deleteUserPost = () => {
  return async (dispatch, getState) => {
    const user = { ...getState().user };
    user.postsCount -= 1;
    await dispatch({ type: "DELETE_USER_POST", payload: user });
  };
};

export const createUserPost = () => {
  return async (dispatch, getState) => {
    const user = { ...getState().user };
    user.posts_count += 1;
    await dispatch({ type: "CREATE_USER_POST", payload: user });
  };
};

export const changeFullname = (fullname) => {
  return async (dispatch , getState) => {
    const user = {...getState().user} ;
    user.fullname = fullname ;
    await dispatch({type : "CHANGE_FULLNAME" , payload : user});
  }
}

export const changeBio = (bio) => {
  return async (dispatch , getState) => {
    
    const user = {...getState().user};
    user.description = bio ;
    await dispatch({type : "CHANGE_BIO" , payload : user})
  }
}