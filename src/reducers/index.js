import { loadingBarReducer } from "react-redux-loading-bar";
import { combineReducers } from "redux";
import { postReducer} from "./post" ;
import { postsReducer } from "./posts";
import { userReducer } from "./user";

export const reducers = combineReducers({
    post : postReducer ,
    posts : postsReducer ,
    user : userReducer ,
    loadingBar : loadingBarReducer ,
})