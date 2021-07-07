import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { isEmpty } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "react-redux-loading-bar";
import { getPostImage } from "../../services/postService";

const Posts = ({ posts }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(hideLoading());
  }, []);

  return (
    <section>
      {!isEmpty(posts) ? null : (
        <div className="text-center">
          <span className="text-muted">Nothing to show</span>
        </div>
      )}
      {posts.map((post) => (
        <div className="card border mb-3 post" key={post.id}>
          <div className="author mb-3 ml-3 mt-2">
            <img
              src={`/img/${post.id}`}
              alt=""
              className="img img-fluid rounded-pill"
            />
            <Link to="" className="ml-1" style={{ textDecoration: "none" }}>
              <span className="text-muted">{post.user_fullname}</span>
            </Link>
          </div>

          <div className="container">
            <img
              class="card-img-top img-fluid rounded"
              src={getPostImage(post.id)}
              alt="Card image cap"
            />
          </div>

          <div className="card-body text-dark mt-0">
            <div className="text-left title mt-3">
              <Link to={`/post/${post.id}`} onClick={ (e) => {
                dispatch(showLoading());
              }}>
                <h5 className="text-dark">{post.title}</h5>
              </Link>
            </div>
            <p className="card-text">{post.description}</p>
            <div className="mt-2">
              {post.keys.split(",").map((key , i) => (
                <Link to={`/search/${key.trim().replace("#" , "")}`} key={i}>
                  <span
                    className="badge badge-info mr-4 p-1 rounded"
                    style={{
                      fontWeight: "400",
                      backgroundColor: "#cccccc",
                      color:"black" ,
                      fontSize: "13px",
                    }}
                  >
                    {key}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <div class="card-footer text-muted p-2">
            <div className="row">
              <div className="col-10">
                <span className="date ml-2">
                  <i>
                    <small>{post.created_at}</small>
                  </i>
                </span>
                {/* <span
                  className="badge badge-info ml-3 p-1"
                  style={{ fontWeight: 350 }}
                >
                  read in 5 min
                </span> */}
              </div>
              <div className="col-2">
                <span>
                  <i className="fa fa-heart mr-2 like"></i>
                  {post.likes}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Posts;
