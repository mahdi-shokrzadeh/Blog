import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { isEmpty } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import Posts from "../posts/Posts";
import { getUserPosts, pendingPosts, searchPosts } from "../../services/postService";
import { hideLoading, showLoading } from "react-redux-loading-bar";
import { getProfilePic } from "../../services/userService";
import { getPendingComments } from "../../services/commentService";
import PendingComments from "../comments/PendingComments";

const IndexPage = ({ match }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const allPosts = useSelector((state) => state.posts);
  const [header, setHeader] = useState("Blogs");
  const [posts, setPosts] = useState(useSelector((state) => state.posts));
  const [contentToShow, setContentToShow] = useState("blog");
  const [comments, setComments] = useState([]);

  const search = async (query) => {
    // const { status , data } = await searchPosts(query);
    // console.log(status , data);
  }

  useEffect(() => {
    if (match.params.query) {
      search(`#${match.params.query}`);
      console.log(match.params.query);
    }
  });

  const handlesection = async (type) => {
    switch (type) {
      case "user-posts":
        setHeader("Posted blogs");
        setContentToShow("blog");

        dispatch(showLoading());
        const token = localStorage.getItem("token");

        try {
          const { data, status } = await getUserPosts(token);
          if (status === 200) {
            setPosts(data.posts);
            dispatch(hideLoading());
          }
        } catch (ex) {
          dispatch(hideLoading());
          console.log(ex);
        }
        break;

      case "all-posts":
        setHeader("Blogs");
        setContentToShow("blog");
        setPosts(allPosts);
        break;

      case "check-posts":
        setHeader("Pending posts");
        setContentToShow("blog");
        try {
          const { status, data } = await pendingPosts(
            localStorage.getItem("token")
          );
          if (status === 200) {
            setPosts(data.posts);
          }
        } catch (er) {
          console.log(er);
        }

        break;

      case "check-comments" :
        setContentToShow("comment");
        setHeader("Pending comments");
        try {
          const {status , data} = await getPendingComments(localStorage.getItem("token"));
          if (status === 200){
            setComments(data.comments);
          }
        }catch(er){
          console.log(er);
        }

        break;

    }
  };

  return (
    <div className="mt-4">
      <div className="main row" style={{ direction: "rtl" }}>
        {/* 1 */}

        <div
          className="col-md-4 col-12 mb-5 rounded side-bar"
          style={{ backgroundColor: "#F1F5F9" }}
        >
          {/* user panel */}
          {!isEmpty(user) ? (
            <div className="user-panel mb-4">
              <div className="ml-3">
                <Link to={`/users/${user.id}`} id="user-panel-link">
                  <div className="row p-2 mb-2 rounded user-panel-item mt-1 d-flex">
                    <div className="col-9 text-left justify-content-center align-self-center">
                      <p
                        className="bold text-black-50 m-0"
                        style={{ textDecoration: "none" }}
                      >
                        {user.fullname}
                      </p>
                    </div>
                    <div className="col-3">
                      <img
                        src={getProfilePic(user.id)}
                        className="img img-fluid rounded-pill"
                        width="60px"
                        height="60px"
                      />
                    </div>
                  </div>
                </Link>

                <Link
                  to="/"
                  id="user-panel-link"
                  style={{ direction: "ltr" }}
                  onClick={(e) => {
                    e.preventDefault();
                    handlesection("all-posts");
                  }}
                >
                  <div className="row p-2 rounded user-panel-item mb-2">
                    <div className="col-12">
                      <span className="text-dark">
                        <i class="fa fa-blog mr-2"></i> Blogs
                      </span>
                    </div>
                  </div>
                </Link>

                <Link to="/" id="user-panel-link" style={{ direction: "ltr" }}>
                  <div className="row p-2 rounded user-panel-item mb-2">
                    <div className="col-10">
                      <span className="text-dark">
                        <i class="fa fa-list mr-2"></i> Reading list
                      </span>
                    </div>

                    <div className="col-2">
                      <span
                        className="badge"
                        style={{ backgroundColor: "#bdeaee" }}
                      >
                        0
                      </span>
                    </div>
                  </div>
                </Link>

                <Link
                  to="/new-post"
                  id="user-panel-link"
                  style={{ direction: "ltr" }}
                >
                  <div className="row p-2 rounded user-panel-item mb-2">
                    <div className="col-12">
                      <span className="text-dark">
                        <i class="fa fa-pen mr-2"></i> Post new blog
                      </span>
                    </div>
                  </div>
                </Link>

                <Link
                  id="user-panel-link"
                  style={{ direction: "ltr" }}
                  onClick={(e) => {
                    e.preventDefault();
                    handlesection("user-posts");
                  }}
                >
                  <div className="row p-2 rounded user-panel-item mb-2">
                    <div className="col-10">
                      <span className="text-dark">
                        <i class="fa fa-tasks mr-2"></i> Manage posted blogs
                      </span>
                    </div>
                    <div className="col-2">
                      <span className="badge badge-success">
                        {user.posts_count}
                      </span>
                    </div>
                  </div>
                </Link>

                <Link
                  id="user-panel-link"
                  style={{ direction: "ltr" }}
                  to="/user/panel"
                >
                  <div className="row p-2 rounded user-panel-item mb-2">
                    <div className="col-10">
                      <span className="text-dark">
                        <i class="fas fa-cog mr-2"></i>Settings
                      </span>
                    </div>
                  </div>
                </Link>

                {/* admin access */}
                {user.role === "Manager" || user.role === "Admin" ? (
                  <React.Fragment>
                    <Link
                      to="/"
                      id="user-panel-link"
                      style={{ direction: "ltr" }}
                      onClick={(e) => {
                        e.preventDefault();
                        handlesection("check-posts");
                      }}
                    >
                      <div className="row p-2 rounded admin-panel-item mb-2">
                        <div className="col-12">
                          <span className="text-dark">
                            <i class="fas fa-check mr-2"></i> Check the posts
                          </span>
                        </div>
                      </div>
                    </Link>

                    <Link
                      to="/"
                      id="user-panel-link"
                      style={{ direction: "ltr" }}
                      onClick={ (e) => {
                        e.preventDefault();
                        handlesection("check-comments")
                      }}
                    >
                      <div className="row p-2 rounded admin-panel-item mb-2">
                        <div className="col-12">
                          <span className="text-dark">
                            <i class="fas fa-comment mr-2"></i> Check the
                            comments
                          </span>
                        </div>
                      </div>
                    </Link>
                  </React.Fragment>
                ) : null}

                {/* manager access */}
                {user.role === "Manager" ? (
                  <Link
                    to="/manage-users"
                    id="user-panel-link"
                    style={{ direction: "ltr" }}
                  >
                    <div className="row p-2 rounded manager-panel-item mb-2">
                      <div className="col-12">
                        <span className="text-dark">
                          <i class="fas fa-user mr-2"></i> manage users
                        </span>
                      </div>
                    </div>
                  </Link>
                ) : null}
              </div>
            </div>
          ) : null}
          {/* popular tags */}

          <div className="popular-tags ml-3 mt-3" style={{ direction: "ltr" }}>
            <h5 className="text-dark " style={{ fontWeight: "bold" }}>
              # Popular tags
            </h5>
            <div className="tags">
              <Link to="/" id="popular-tag-link">
                <div className="ml-2 popular-tag rounded p-1 mb-2">
                  <span className="ml-3">#Laravel</span>
                </div>
              </Link>

              <Link to="/" id="popular-tag-link">
                <div className="ml-2 popular-tag rounded p-1 mb-2">
                  <span className="ml-3">#Adonis Js</span>
                </div>
              </Link>

              <Link to="/" id="popular-tag-link">
                <div className="ml-2 popular-tag rounded p-1 mb-2">
                  <span className="ml-3">#Node Js</span>
                </div>
              </Link>

              <Link to="/" id="popular-tag-link">
                <div className="ml-2 popular-tag rounded p-1 mb-2">
                  <span className="ml-3">#react</span>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* 2 */}

        <div className="col-md-8 col-12 posts" style={{ direction: "ltr" }}>
          <div className="header mb-4 border-bottom text-center">
            <h4>
              <i>{header}</i>
            </h4>
          </div>

          <div className="container">
            {/* posts */}

            {contentToShow === "blog" ? <Posts posts={posts} /> : null}
            {/* comments */}
            {contentToShow === "comment" ? <PendingComments comments={comments} /> : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
