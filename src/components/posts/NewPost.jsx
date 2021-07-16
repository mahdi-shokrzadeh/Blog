import React, { useState, useRef, useEffect } from "react";
import { EditorState } from "draft-js";
import TextEditor from "../common/TextEditor";
import { convertToHTML } from "draft-convert";
import SimpleReactValidator from "simple-react-validator";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "react-redux-loading-bar";
import { toast } from "react-toastify";
import { withRouter } from "react-router";
import { createPost } from "../../services/postService";
import {createUserPost} from "../../actions/user" ;
import { getAllPosts } from "../../actions/posts";
import { isEmpty } from "lodash";

const NewPosts = ({history}) => {

  const user = useSelector(state => state.user);
  useEffect(() => {
    if(isEmpty(user)){
      history.replace("/404");
    }
  }, []);


  const dispatch = useDispatch();
  const validator = useRef(
    new SimpleReactValidator({
      element: (message) => (
        <div style={{ color: "red", fontSize: "small" }}>{message}</div>
      ),
    })
  );

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [convertedContent, setConvertedContent] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [, forceUpdate] = useState("");

  const reset = () => {
    setDescription("");
    setTags("");
    setTitle("");
    setConvertedContent("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validator.current.allValid()) {
      dispatch(showLoading());
      try {
        const formData = new FormData();
        // const post = {
        //   title,
        //   content: convertedContent,
        //   token: localStorage.getItem("token"),
        //   keys: tags,
        //   post: selectedFile,
        // };
        formData.append("title", title);
        formData.append("post", selectedFile);
        formData.append("description" , description);
        formData.append("content", convertedContent);
        formData.append("token", localStorage.getItem("token"));
        formData.append("tags", tags);

        const { data, message, status } = await createPost(formData);

        if (status === 200) {
          dispatch(hideLoading());
          // update user posts count
          dispatch(createUserPost()) ;
          dispatch(getAllPosts()) ;
          history.replace("/");
          reset();

          toast.success("Post created !", {
            position: "top-right",
            closeOnClick: true,
          });
        }
      } catch (ex) {
        console.log(ex);
        dispatch(hideLoading());
      }
    } else {
      validator.current.showMessages();
      forceUpdate(1);
    }
  };

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);

    convertContentToHTML();
  };

  const convertContentToHTML = () => {
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(currentContentAsHTML);
  };

  return (
    <div className="container">
      <div className="header mt-4">
        <i>
          <h4>Write new post</h4>
        </i>
      </div>
      <hr />

      <div>
        <form onSubmit={handleSubmit}>
          <div class="form-group mt-2">
            <label for="InputTitle">Title</label>
            <input
              type="text"
              name="title"
              class="form-control"
              id="InputTitle"
              aria-describedby="emailHelp"
              placeholder="Enter title"
              onChange={(e) => {
                setTitle(e.target.value);
                validator.current.showMessageFor("title");
              }}
            />
          </div>
          {validator.current.message("title", title, "required")}

          <div class="form-group mt-2">
            <label for="Textaria">Description</label>
            <textarea
              class="form-control"
              name="description"
              id="Textaria"
              placeholder="Enter descriptoin"
              rows="3"
              onChange={(e) => {
                setDescription(e.target.value);
                validator.current.showMessageFor("description");
              }}
            ></textarea>
          </div>
          {validator.current.message("description", description, "required")}

          <div class="form-group mt-2">
            <label for="InputTags">Tags</label>
            <input
              type="text"
              name="tags"
              class="form-control"
              id="InputTags"
              aria-describedby="Tag"
              placeholder="Enter title"
              onChange={(e) => {
                setTags(e.target.value.split(","));
                validator.current.showMessageFor("tags");
              }}
            />
            <small id="Tag" class="form-text text-muted">
              separate the tags with ","
            </small>
          </div>
          {validator.current.message("tags", tags, "required")}

          <div class="custom-file mt-2">
            <input
              type="file"
              name="file"
              class="custom-file-input"
              id="validatedCustomFile"
              onChange={(e) => {
                setSelectedFile(e.target.files[0]);
                validator.current.showMessageFor("file");
              }}
              required
            />
            <label
              class="custom-file-label text-muted"
              for="validatedCustomFile"
            >
              choose cover image
            </label>
            <div class="invalid-feedback">
              Example invalid custom file feedback
            </div>
          </div>
          {validator.current.message("file", selectedFile, "required")}

          <label className="mt-4">Content</label>

          <TextEditor
            onEditorStateChange={onEditorStateChange}
            editorState={editorState}
          />

          <div className="text-center mt-5">
            <button type="submit" class="btn btn-outline-success rounded-pill">
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withRouter(NewPosts);
