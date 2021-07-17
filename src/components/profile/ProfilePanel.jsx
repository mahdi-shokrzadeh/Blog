import { isEmpty } from "lodash";
import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router";
import { toast } from "react-toastify";
import SimpleReactValidator from "simple-react-validator";
import { changeFullname } from "../../actions/user";
import { editProfile, getProfilePic } from "../../services/userService";

const ProfilePanel = ({ history }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      isEmpty(localStorage.getItem("user")) ||
      isEmpty(localStorage.getItem("token"))
    ) {
      history.replace("/404");
    }
  }, []);

  const user = useSelector((state) => state.user);

  const validator = useRef(
    new SimpleReactValidator({
      element: (message) => (
        <div style={{ color: "red", fontSize: "small" }}>{message}</div>
      ),
    })
  );

  const [, forceUpdate] = useState("");
  const [fullname, setFullname] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [bio, setBio] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validator.current.allValid()) {
      const formData = new FormData();
      formData.append("token", localStorage.getItem("token"));
      formData.append("fullname", fullname);
      formData.append("description", bio);
      formData.append("pic", selectedFile);

      // request to server for update
      try {
        const { data, status } = await editProfile(formData);
        console.log(status);
        if (status === 200) {
          toast.success("Profile updated!");
          dispatch(changeFullname(fullname));
        }
      } catch (er) {
        console.log(er);
      }
    } else {
      validator.current.showMessages();
      forceUpdate(1);
    }
  };
  const style = {
    color: "#4D5569",
  };

  return (
    <div className="mt-5 profile-border p-3">
      <div className="header">
        <h5 style={{ color: "#475569" }}>Profile information</h5>
      </div>
      <hr />
      <div className="row">
        <div className="col-12 col-md-3 mb-3 text-center">
          <img
            src={getProfilePic(user.id)}
            alt=""
            className="img img-fluid rounded-pill"
            style={{ width: "100px", height: "100px" }}
          />
        </div>
        <div className="col-6 col-md-5 text-left">
          <div className="m-1">
            <span className="title-profile">Fullname : </span>
            <i>
              <span style={style}>{user.fullname}</span>
            </i>
          </div>
          <div>
            <span className="title-profile">Bio : </span>
              {user.description}
          </div>
          <div className="m-1">
            <span className="title-profile">Email address : </span>
            <i>
              <span style={style}>{user.email}</span>
            </i>
          </div>
        </div>
        <div className="col-6 col-md-4">
          <div className="m-1 text-left">
            <span className="title-profile">Role : </span>
            <span className="badge badge-warning rounded-pill p-1">
              {user.role}
            </span>
          </div>
          <div className="m-1 text-left">
            <span className="title-profile">Posted articles : </span>
            <span className="badge badge-success badge-pill">
              {user.posts_count}
            </span>
          </div>
          <div>
            <span className="title-profile">Posted comments : </span>
            <span className="badge badge-primary badge-pill">
              {user.comments_count}
            </span>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h5 style={{ color: "#475569" }}>Edit profile</h5>
      </div>
      <hr />

      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="form-group p-2">
          <input
            type="text"
            name="fullname"
            placeholder="fullname..."
            className="form-control"
            onChange={(e) => {
              setFullname(e.target.value);
              validator.current.showMessageFor("fullname");
            }}
          />
          {validator.current.message("fullname", fullname, "required|min:3")}

          <input
            type="text"
            name="bio"
            placeholder="bio ..."
            className="form-control mt-3"
            onChange={(e) => {
              setBio(e.target.value);
              validator.current.showMessageFor("bio");
            }}
          />
          {validator.current.message("bio", bio, "required|max:100")}
        </div>
        <div class="custom-file mt-3">
          <input
            type="file"
            name="file"
            class="custom-file-input input"
            id="validatedCustomFile"
            onChange={(e) => {
              setSelectedFile(e.target.files[0]);
              validator.current.showMessageFor("file");
            }}
          />
          {validator.current.message("file", selectedFile, "required")}

          <label class="custom-file-label" for="validatedCustomFile">
            Choose Profile photo...
          </label>
          <div className="text-center mt-4">
            <input
              type="submit"
              value="Update profile"
              name=""
              id="submit-form-button"
              className="btn btn-outline-success rounded-pill"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default withRouter(ProfilePanel);
