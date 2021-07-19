import React, { useRef, useState } from "react";
import { isEmpty } from "lodash";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProfilePic } from "../../services/userService";
import SimpleReactValidator from "simple-react-validator";
import { createComment } from "../../services/commentService";
import { toast } from "react-toastify";
import { getPost } from "../../services/postService";
import Comment from "./Comment";

const Comments = ({ comments = [], postId }) => {


  const [showCommentSection, setShowCommentSection] = useState(false);
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [, forceUpdate] = useState("");

  const user = useSelector((state) => state.user);

  const validator = useRef(
    new SimpleReactValidator({
      element: (message) => (
        <div style={{ color: "red", fontSize: "small" }}>{message}</div>
      ),
    })
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validator.current.allValid()) {
      const data = {
        token: localStorage.getItem("token"),
        text: comment,
        fullname: name,
      };
      const { status } = await createComment(postId, data);
      if (status === 200) {
        toast.dark("Comment posted !");
        setShowCommentSection(false);
      }
    } else {
      validator.current.showMessages();
      forceUpdate(1);
    }
  };

  const Profile =
    localStorage.getItem("token") && !isEmpty(user) ? (
      <Link
        to={`/users/${user.user_id}`}
        className="ml-1"
        style={{ textDecoration: "none" }}
      >
        <div className="row">
          <div className="col-1 align-items-center justify-content-center">
            <img
              src={getProfilePic(user.id)}
              width="40px"
              height="40px"
              className="rounded-pill"
              alt=""
            />
          </div>
          <div className="col-3 text-left d-flex">
            <span
              className="text-dark align-self-center"
              style={{ fontSize: "15px", fontWeight: "bolder" }}
            >
              {user.fullname}
            </span>
          </div>
        </div>
      </Link>
    ) : (
      // <div>

      // </div>
      <div className="alert alert-info">
        <span style={{ fontWeight: "bold" }}>
          Your comment will be displayed after approval .
        </span>
      </div>
    );

  return (
    <div className="comments mt-5">
      <div className="row mb-2">
        <div className="col-7">
          <h5>Comments</h5>
        </div>

        <div className="col-5 text-right">
          <button
            className="btn btn-dark btn-sm mr-2"
            onClick={(e) => {
              setShowCommentSection(!showCommentSection);
            }}
          >
            Post comment
          </button>
        </div>
      </div>
      <div className="rounded p-2">
        {showCommentSection ? (
          <div className="mb-4">
            <div>{Profile}</div>
            <div className="mt-2">
              <form onSubmit={handleSubmit} className="form-group">
                {!localStorage.getItem("token") ? (
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Enter your name ..."
                    onChange={(e) => {
                      setName(e.target.value);
                      validator.current.showMessageFor("name");
                    }}
                  />
                ) : null}
                {!localStorage.getItem("token") ? (
                  <div>
                    {validator.current.message("name", name, "required")}
                  </div>
                ) : null}
                <textarea
                  className="form-control mb-1 mt-3"
                  placeholder="Enter your text ..."
                  name="comment"
                  cols="30"
                  rows="10"
                  onChange={(e) => {
                    setComment(e.target.value);
                    validator.current.showMessageFor("comment");
                  }}
                ></textarea>
                {validator.current.message("comment", comment, "required")}

                <input
                  type="submit"
                  value="submit"
                  className="btn btn-sm btn-success rounded mt-2"
                />
                <button
                  className="btn btn-sm btn-danger rounded mt-2 ml-4"
                  onClick={(e) => {
                    setShowCommentSection(false);
                  }}
                >
                  cancel
                </button>
              </form>
            </div>
          </div>
        ) : null}
        {isEmpty(comments) ? (
          <div className="alert alert-primary">
            <span>
              <i class="fas fa-info-circle mr-3"></i>No comments have been
              posted yet .
            </span>
          </div>
        ) : null}
        {comments.map((comment) => (
          <Comment comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default Comments;
