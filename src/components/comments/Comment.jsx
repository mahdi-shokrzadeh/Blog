import { isEmpty } from "lodash";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useParams } from "react-router";
import SimpleReactValidator from "simple-react-validator";


import { createComment, deleteComment } from "../../services/commentService";
import { getPost } from "../../services/postService";
import { getProfilePic } from "../../services/userService";
import RepliedComment from "./RepliedComment";





const Comment = ({ comment }) => {
  const user = useSelector((state) => state.user);
  const [reply, setReply] = useState("");
  const [name, setName] = useState();
  const dispatch = useDispatch();
  const { id } = useParams();
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
    if (validator.current.allValid()) {
      if (localStorage.getItem("token")) {
        const data = {
          token: localStorage.getItem("token"),
          text: reply,
        };
        const { status } = await createComment(post.id, data, commentId);
        if (status === 200) {
          toast.dark("Comment posted !");
          // update post's comment section
        }
      } else {
        // logged out
        const data = {
            token: "" ,
            text: reply ,
            fullname: name 
        }
        const { status } = await createComment(post.id , data , commentId);
        if(status === 200){
          toast.dark("Comment posted !");
          // update post's comment section
        }
      }
    } else {
      validator.current.showMessages();
      forceUpdate(1);
    }
  };

  const handleDelete = async (commentId) => {

    const {status , data} = await deleteComment(commentId , localStorage.getItem("token"));
    if( status === 200 ){
      toast.success("Comment deleted Successfully !");
      window.location.reload();
    }else{
      console.log(status , data);
    }
  }

  return (
    <div className="comment border p-4" key={comment.id}>
      <div className="row">
        <div className="col-4">
          <img
            src={getProfilePic(comment.user_id)}
            className="img img-fluid rounded-pill mr-3"
            width="35px"
            height="35px"
          />
          <h6 className="d-inline">{comment.user_fullname}</h6>
        </div>
        <div className="col-8 text-right">
          {/* admin or manager or comment owner icon */}
          {user.role === "Manager" || user.role === "Admin" ? (
            <button 
            className="btn btn-sm text-center"
            onClick={ (e) =>{
              handleDelete(comment.id)}
            }
            >
              <i className="fas fa-trash text-danger"></i>
            </button>
          ) : user.id === comment.user_id ? (
            <button 
            className="btn btn-sm text-center"
            onClick={ (e) => {
              handleDelete(comment.id)}}
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

      <div className="mt-3">
        <div className="comment-content">
          <p style={{ fontSize: "14px" }} className="justfy">
            {comment.text}
          </p>
        </div>
        {showReplyContent ? (
          localStorage.getItem("token") ? (
            <div className="mt-4 mb-3">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit(comment.id);
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
                  handleSubmit(comment.id);
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

        {/* replied comments */}
        {comment.replying_comments.map((repliedComment) => (
          <RepliedComment
            repliedComment={repliedComment}
            parentCommentId={comment.id}
            key={repliedComment.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Comment;
