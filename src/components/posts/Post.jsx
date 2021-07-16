import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSinglePost, likePost } from "../../actions/post";
import { Link, useParams } from "react-router-dom";
import { withRouter } from "react-router";
import { hideLoading } from "react-redux-loading-bar";
import {
  approvePost,
  getPostImage,
  handlelikePost,
} from "../../services/postService";
import DOMPurify from "dompurify";
import Content from "../common/Content";
import { isEmpty } from "lodash";
import { getAllPosts } from "../../actions/posts";
import Comments from "../comments/Comments";
import { toast } from "react-toastify";
import { getProfilePic } from "../../services/userService";

const Post = ({ match, history }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(hideLoading());
    if (localStorage.getItem("token")) {
      dispatch(getSinglePost(match.params.id, localStorage.getItem("token")));
    } else {
      dispatch(getSinglePost(match.params.id, ""));
    }
  }, []);

  const post = useSelector((state) => state.post);
  const user = useSelector((state) => state.user);

  let likeStyle = post.is_liked ? "text-danger" : "text-muted";

  const handleApprovement = async (type) => {
    const data = {
      token: localStorage.getItem("token"),
      approvement: type,
    };
    try {
      const {status} = await approvePost(data, post.id);
      if(status === 200){

        toast.dark("Successfully done !");
        dispatch(getAllPosts());
        dispatch(getSinglePost(post.id , localStorage.getItem("token")))
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
          <Link to="/" id="user-panel-link" style={{ textDecoration: "none" }}>
            <div className="row p-2 mb-2 rounded user-panel-item border mt-3">
              <div className="col-3">
                <img
                  src={getProfilePic(user.id)}
                  className="img img-fluid rounded-pill"
                />
              </div>

              <div className="col-9 text-right">
                <p className="bold text-dark m-0">Mahdi Shokrzadeh</p>
                <span className="text-muted">@shokrzadeh</span>
              </div>
              <div className="ml-3 mt-2">
                <div className="text-dark m-0">
                  <p>decriptoin</p>
                </div>

                <div className="m-0 text-dark">
                  <span
                    className="mr-2"
                    style={{ fontSize: "14px", color: "gray" }}
                  >
                    Registration date :
                  </span>
                  <span className="text-muted">
                    <i>11 sep 2020</i>
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
                  className="fa fa-comments fa-2x"
                  style={{ color: "#475569" }}
                ></i>
              </div>
              <div className="ml-2">
                <span>3</span>
              </div>
              <div className="mt-3">
                <i
                  className="fa fa-plus fa-2x"
                  style={{ color: "limegreen" }}
                ></i>
              </div>
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

                {/* <div className="tags d-flex flex-row mt-3">
                 
                  {post.keys.split(",").map((key , i) => (
                    <Link to={`/search/${key.trim().replace("#", "")}`} key={i}>
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
                  ))}
                </div> */}
              </div>

              <hr />
              <div className="inf mt-2">
                <span className="text-muted">
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
                    <i
                      className="fa fa-heart mr-3"
                      style={{ color: "red" }}
                    ></i>
                    <span>2</span>
                  </div>

                  <div className="col-4 text-center comments-icon">
                    <i className="fa fa-comments mr-3"></i>
                    <span>3</span>
                  </div>
                  <div className="col-4 text-center">
                    <i
                      className="fa fa-plus"
                      style={{ color: "limegreen" }}
                    ></i>
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
