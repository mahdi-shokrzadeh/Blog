import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { withRouter } from "react-router";
import { hideLoading } from "react-redux-loading-bar";
import DOMPurify from "dompurify";
import { isEmpty } from "lodash";

import {
  approvePost,
  getPostImage,
  handlelikePost,
} from "../../services/postService";
import { getSinglePost, likePost } from "../../actions/post";
import Content from "../common/Content";
import { getAllPosts } from "../../actions/posts";
import Comments from "../comments/Comments";
import { toast } from "react-toastify";
import { bookmark, getProfilePic } from "../../services/userService";
import { getUserBookmarks } from "../../actions/bookmarks";

const Post = ({ match, history }) => {
  const dispatch = useDispatch();
  const post = useSelector((state) => state.post);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(hideLoading());
    if (localStorage.getItem("token")) {
      dispatch(getSinglePost(match.params.id, localStorage.getItem("token")));
    } else {
      dispatch(getSinglePost(match.params.id, ""));
    }
  }, []);

  let likeStyle = post.is_liked ? "text-danger" : "text-muted";
  let bookmarkStyle = post.is_saved ? "#475569" : "#A9A9A9";

  const handleApprovement = async (type) => {
    const data = {
      token: localStorage.getItem("token"),
      approvement: type,
    };
    try {
      const { status } = await approvePost(data, post.id);
      if (status === 200) {
        toast.dark("Successfully done !");
        dispatch(getAllPosts());
        dispatch(getSinglePost(post.id, localStorage.getItem("token")));
      }
    } catch (er) {
      console.log(er);
    }
  };

  const handleLike = async () => {
    if (!isEmpty(localStorage.getItem("token"))) {
      try {
        const data = {
          token: localStorage.getItem("token"),
        };
        const { status } = await handlelikePost(post.id, data);
        if (status === 200) {
          dispatch(likePost());
          dispatch(getAllPosts());
        }
      } catch (er) {
        console.log(er);
      }
    } else {
      history.push("/login");
    }
  };

  let statusStyle = "badge-danger";
  if (post.status === "Approved") {
    statusStyle = "badge-success";
  } else if (post.status === "Pending") {
    statusStyle = "badge-warning";
  }

  // "edit" access

  const handleBookmark = async () => {
    if (!isEmpty(localStorage.getItem("token"))) {
      try {
        const data = {
          id: post.id,
        };
        const { status } = await bookmark(
          localStorage.getItem("token"),
          post.id
        );
        if (status === 200) {
          if (post.is_saved === true) {
            toast.info("Post unbookmarked !");
          } else {
            toast.success("Post bookmarked !");
          }
          dispatch(getUserBookmarks(localStorage.getItem("token")));
          dispatch(getSinglePost(post.id, localStorage.getItem("token")));
        }
      } catch (er) {
        console.log(er);
      }
    } else {
      history.push("/login");
    }
  };

  let section = null;
  if (localStorage.getItem("token")) {
    if (user.role === "Manager" || user.role === "Admin") {
      section = (
        <div className="border mt-4 p-2 approvement-section">
          <div className="mb-3 mt-3 text-center">
            <i>
              <span
                className="bold"
                style={{ fontSize: "14px", fontWeight: "bold" }}
              >
                Post status :{" "}
              </span>
            </i>
            <span className={`badge p-1 ${statusStyle}`}>{post.status}</span>
          </div>
          <div className="text-center mt-4">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                handleApprovement("Approved");
              }}
              style={{ fontSize: "12.5px" }}
              className={`btn btn-sm btn-outline-success rounded-pill ${
                post.status === "Approved" ? "disabled" : null
              }`}
            >
              Approve
            </a>

            <a
              href="/"
              style={{ fontSize: "12.5px" }}
              onClick={(e) => {
                e.preventDefault();
                handleApprovement("Disapproved");
              }}
              className={`btn btn-sm btn-outline-danger rounded-pill ml-2 ${
                post.status === "Disapproved" ? "disabled" : null
              }`}
            >
              Disapprove
            </a>
          </div>
          <div className="mt-4 mb-3 text-center">
            <Link to={`/post/${post.id}/edit`}>
              <button className="btn btn-primary rounded-pill btn-sm">
                Edit this post
              </button>
            </Link>
          </div>
        </div>
      );
    } else if (user.id === post.user_id) {
      section = (
        <div className="border mt-4 p-2 approvement-section">
          <div className="mb-4 mt-2 text-center">
            <i>
              <span
                className="bold"
                style={{ fontSize: "14px", fontWeight: "bold" }}
              >
                Post status :{" "}
              </span>
            </i>
            <span className={`badge p-1 ${statusStyle}`}>{post.status}</span>
          </div>

          <div className="mt-3 mb-3 text-center">
            <Link to={`/post/${post.id}/edit`}>
              <button className="btn btn-primary rounded-pill btn-sm">
                Edit this post
              </button>
            </Link>
          </div>
        </div>
      );
    }
  }

  return (
    <div className="row mt-4">
      <div className="col-12 col-lg-3 side-bar order-2">
        <div className="container">
          <Link
            to={`/users/${post.user_id}`}
            id="user-panel-link"
            style={{ textDecoration: "none" }}
          >
            <div className="p-2 mb-2 user-panel-item mt-3" id="author_inf">
              <div className="row pl-2 mb-3">
                <div className="col-4 mt-2">
                  <img
                    src={getProfilePic(post.user_id)}
                    className="img img-fluid rounded-pill"
                    width="65px"
                    height="65px"
                  />
                </div>

                <div className="col-8 mt-2 d-flex texr-left">
                  <span
                    className="text-dark align-self-center m-0"
                    style={{ fontWeight: "bolder" }}
                  >
                    <i>{post.user_fullname}</i>
                  </span>
                </div>
              </div>
              <div className="ml-3 mt-2">
                <div className="mb-2">
                  <span className="text-muted" style={{ fontSize: "14px" }}>
                    {user.description}
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* edit button */}
          {section}
        </div>
      </div>

      <div className="col-12 col-lg-9">
        <div className="row">
          <div className="col-1 d-flex flex-column">
            <div className="d-none d-md-block">
              <Link
                className={`like-icon ${likeStyle}`}
                style={{ textDecoration: "none" }}
              >
                <i
                  className="fa fa-heart fa-2x"
                  to=""
                  onClick={(e) => {
                    e.preventDefault();
                    handleLike();
                  }}
                ></i>
              </Link>
              <div className="ml-2">
                <span>{post.likes}</span>
              </div>
              <div className="comments-icon mt-3">
                <i
                  className="fas fa-comments fa-2x"
                  style={{ color: "#475569" }}
                ></i>
              </div>
              <div className="ml-2 mb-3">
                <span>{post.comment_count}</span>
              </div>
              <Link
                to="/"
                className="mt-3"
                onClick={(e) => {
                  e.preventDefault();
                  handleBookmark();
                }}
              >
                <i
                  className="fas fa-bookmark fa-2x"
                  style={{ color: bookmarkStyle }}
                ></i>
              </Link>
            </div>
          </div>

          <div className="col-sm-12 col-md-11">
            <div className="container single-post border rounded p-4">
              <div className="header text-left">
                <h5 className="mb-3">{post.title}</h5>
                <img
                  src={getPostImage(post.id)}
                  className="img img-fluid rounded"
                />

                <div className="tags d-flex flex-row mt-3">
                  {post.tags
                    ? post.tags.split(",").map((key, i) => (
                        <Link
                          to={`/search/${key.trim().replace("#", "")}`}
                          key={i}
                        >
                          <span
                            className="badge badge-info mr-4 p-1 rounded"
                            style={{
                              fontWeight: "400",
                              backgroundColor: "#cccccc",
                              color: "black",
                              fontSize: "13px",
                            }}
                          >
                            {key}
                          </span>
                        </Link>
                      ))
                    : null}
                </div>
              </div>

              <hr />
              <div className="inf mt-2">
                <span className="text-muted" style={{ fontSize: "14px" }}>
                  {" "}
                  Posted on <i>{post.created_at}</i>
                </span>
              </div>

              {/* {console.log(post.keys.split(","))} */}

              <div className="mt-4">
                <Content html={DOMPurify.sanitize(post.content)} />
              </div>

              <hr className="d-md-none" />
              <div className="d-md-none">
                <div className="row">
                  <div className="col-4 text-center like-icon">
                    <Link
                      className={`like-icon ${likeStyle}`}
                      style={{ textDecoration: "none" }}
                    >
                      <i
                        className="fa fa-heart mr-3"
                        to=""
                        onClick={(e) => {
                          e.preventDefault();
                          handleLike();
                        }}
                      ></i>
                      <span>{post.likes}</span>
                    </Link>
                  </div>

                  <div className="col-4 text-center comments-icon">
                    <i className="fa fa-comments mr-3"></i>
                    <span>{post.comment_count}</span>
                  </div>
                  <div className="col-4 text-center">
                    <Link
                      to="/"
                      className="mt-3"
                      onClick={(e) => {
                        e.preventDefault();
                        handleBookmark();
                      }}
                    >
                      <i
                        className="fas fa-bookmark"
                        style={{ color: bookmarkStyle }}
                      ></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            {/* comments */}
            <Comments comments={post.comments} postId={post.id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Post);
