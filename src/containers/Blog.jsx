import React, { Fragment , useEffect} from "react";
import { NavLink, Redirect } from "react-router-dom";
import { Switch , Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { isEmpty } from "lodash";

import MainLayout from "../layouts/MainLayput";
import About from "../components/common/About" ;
import Posts from "../components/posts/Posts";
import Login from "../components/login/Login";
import Register from "../components/register/Register";
import Contact from "../components/common/Contact";
import Logout from "../components/login/Logout";
import { addUser } from "../actions/user";
import { decodeToken } from "../utils/decodeToken";
import Post from "../components/posts/Post";
import NewPost from "../components/posts/NewPost";
import IndexPage from "../components/common/IndexPage";

const Blog = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(token){
      dispatch(addUser({fullname  : "Mahdi"}))
    }
  }, []);


  return (
    <MainLayout>
        <Switch>
            <Route path="/post/:id" exact component={Post} /> 
            <Route path="/new-post" exact component={NewPost} />
            <Route path="/about" exact component={About} />
            <Route path="/" exact component={IndexPage} />
            <Route path="/login" exact component={Login} />
            <Route path="/logout" exact component={Logout} />
            <Route path="/register" exact component={Register} />
            <Route path="/contact" exact component={Contact} />
        </Switch>
    </MainLayout>
  );
};

export default Blog;
