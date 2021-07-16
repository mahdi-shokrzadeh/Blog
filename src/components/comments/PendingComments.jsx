import { isEmpty } from "lodash";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  approveComment,
  getPendingComments,
} from "../../services/commentService";
import { getProfilePic } from "../../services/userService";

const PendingComments = (props) => {

  const [comments, setComments] = useState([]);

  const updateComments = async () => {
    const {status , data } = await getPendingComments(localStorage.getItem("token"));
    if(status === 200){
      setComments(data.comments);
    }
  }

  useEffect(() => {
    updateComments();
    
  } , []);

  const handleApprovement = async (type, commentId) => {
    const data = {
      token: localStorage.getItem("token"),
      approvement: type,
    };

    try {
      const { status } = await approveComment(data, commentId);
      if (status === 200) {
        toast.success("Successfully done !");
        // update comments
        updateComments();
      } else {
        console.log(status);
      }
    } catch (er) {
      console.log(er);
    }
  };

  return (
    <div>
      {isEmpty(comments) ? (
        <div className="text-center">
          <span className="text-muted">Nothing to show</span>
        </div>
      ) : null}
      {comments.map((comment) => (
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
              {/* approve or delete the comment */}

              <button
                className="btn btn-sm text-center"
                onClick={(e) => {
                  handleApprovement("Disapproved", comment.id);
                }}
              >
                <i className="fas fa-trash text-danger"></i>
              </button>

              <button
                className="btn text-center"
                onClick={(e) => {
                  handleApprovement("Approved", comment.id);
                }}
              >
                <i className="fas fa-check" style={{ color: "green" }}></i>
              </button>
            </div>
          </div>

          <div className="mt-3">
            <div className="comment-content">
              <p style={{ fontSize: "14px" }} className="justfy">
                {comment.text}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PendingComments;
