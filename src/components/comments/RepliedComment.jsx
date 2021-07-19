import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import SimpleReactValidator from "simple-react-validator";
import { createComment, deleteComment } from "../../services/commentService";
import { getProfilePic } from "../../services/userService";

const RepliedComment = ({ repliedComment, parentCommentId }) => {
  const user = useSelector((state) => state.user);
  const [name, setName] = useState();
  const [reply, setReply] = useState("");
  const [, forceUpdate] = useState("");
  const post = useSelector((state) => state.post);
  const validator = useRef(
    new SimpleReactValidator({
      element: (message) => (
        <div style={{ color: "red", fontSize: "small" }}>{message}</div>
      ),
    })
  );
  const [showReplyContent, setShowReplyContent] = useState(false);
  const handleSubmit = async (commentId) => {
    // name = urepliedComment.user_fullname

    if (validator.current.allValid()) {
      if (localStorage.getItem("token")) {
        const data = {
          token: localStorage.getItem("token"),
          text: reply,
        };
        const { status } = await createComment(
          post.id,
          data,
          commentId,
          repliedComment.user_fullname
        );
        if (status === 200) {
          toast.dark("Comment posted !");
          setShowReplyContent(false);
        }
      } else {
        // user logged out
        const data = {
          token: "",
          text: reply,
          fullname: name,
        };
        const { status } = await createComment(
          post.id,
          data,
          commentId,
          repliedComment.user_fullname
        );
        if (status === 200) {
          toast.dark("Comment posted !");
        }
      }
    } else {
      validator.current.showMessages();
      forceUpdate(1);
    }
  };

  const handleDelete = async (commentId) => {

    const {status} = await deleteComment(commentId , localStorage.getItem("token"));
    if(status === 200){
      toast.success("Comment deleted successfully !");
      window.location.reload();
    }
  }



  return (
    <div className="replied-comment border p-3 mb-2">
      <div className="row">
        <div className="col-4">
          <img
            src={getProfilePic(repliedComment.user_id)}
            className="img img-fluid rounded-pill mr-3"
            width="35px"
            height="35px"
          />
          <h6 className="d-inline">{repliedComment.user_fullname}</h6>
        </div>
        <div className="col-8 text-right">
          {/* manager or commet owner icon */}
          {user.role === "Manager" || user.role === "Admin" ? (
            <button 
            className="btn btn-sm"
            onClick={(e) => {
              handleDelete(repliedComment.id)
            }}
            >
              <i className="fas fa-trash text-danger"></i>
            </button>
          ) : user.id === repliedComment.user_id ? (
            <button 
            className="btn btn-sm"
            onClick={ (e) => {
              handleDelete(repliedComment.id)
            }}
            >
              <i className="fas fa-trash text-danger"></i>
            </button>
          ) : null}
          <button
            className="btn text-center"
            onClick={(e) => {
              setShowReplyContent(!showReplyContent);
            }}
          >
            <i className="fa fa-arrow-right" style={{ color: "green" }}></i>
          </button>
        </div>
      </div>
      {repliedComment.in_reply_to !== null ? (
        <div className="mt-2">
          <span
            className="badge badge-secondary badge-pill"
            style={{ fontWeight: "300" }}
          >
            in reply to {repliedComment.in_reply_to}
          </span>
        </div>
      ) : null}

      <div className="mt-3">
        <div className="comment-content">
          <p style={{ fontSize: "14px" }} className="justfy">
            {repliedComment.text}
          </p>
        </div>
        {showReplyContent ? (
          localStorage.getItem("token") ? (
            <div className="mt-4 mb-3">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit(parentCommentId);
                }}
                className="form-group"
              >
                <textarea
                  className="form-control mb-1"
                  name="reply"
                  cols="30"
                  rows="8"
                  placeholder="Write your reply ..."
                  onChange={(e) => {
                    setReply(e.target.value);
                    validator.current.showMessageFor("reply");
                  }}
                ></textarea>
                {validator.current.message("reply", reply, "required")}
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-success btn-sm mt-2 mb-2"
                />
              </form>
            </div>
          ) : (
            <div className="mt-4 mb-3">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit(parentCommentId);
                }}
                className="form-group"
              >
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name ..."
                  className="form-control mb-2"
                  onChange={(e) => {
                    setName(e.target.value);
                    validator.current.showMessageFor("name");
                  }}
                />
                {validator.current.message("name", name, "required|max:10")}
                <textarea
                  className="form-control mb-1"
                  name="reply"
                  cols="30"
                  rows="8"
                  placeholder="Write your reply ..."
                  onChange={(e) => {
                    setReply(e.target.value);
                    validator.current.showMessageFor("reply");
                  }}
                ></textarea>
                {validator.current.message("reply", reply, "required")}
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-success btn-sm mt-2 mb-2"
                />
              </form>
            </div>
          )
        ) : null}
      </div>
    </div>
  );
};

export default RepliedComment;
