import React, { Fragment , useEffect, useRef } from "react";
import { useParams } from "react-router";
import { withRouter } from "react-router-dom";
import Post from "./Post";
import TextEditor from "../common/TextEditor";
import { useState } from "react";
import { EditorState } from "draft-js";
import { convertToHTML } from "draft-convert";
import SweetAlert from "react-bootstrap-sweetalert";
import { deletePost, editPost, getPost } from "../../services/postService";
import { Redirect} from "react-router-dom" ;
import { useDispatch, useSelector } from "react-redux";
import { deleteUserPost} from "../../actions/user" ;
import { getAllPosts } from "../../actions/posts";
import { isEmpty } from "lodash";
import SimpleReactValidator from "simple-react-validator";
import { toast } from "react-toastify";

const EditPost = ({history}) => {

  const user = useSelector(state => state.user);
  const { id } = useParams();

  const validator = useRef(
    new SimpleReactValidator({
      element: (message) => (
        <div style={{ color: "red", fontSize: "small" }}>{message}</div>
      ),
    })
  );

  useEffect( async () => {
    if(isEmpty(user)){
      history.replace("/404");
    }else{
      
      if(user.role === "Manager" || user.role === "Admin"){

      }else{
        
        const {data , status } = await getPost(id);
        if(status === 200){
          if(data.post.user_id !== user.id ){
            history.replace("/404");
          }
        }
      }
    }

  }, []);

  const dispatch = useDispatch() ;

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [convertedContent, setConvertedContent] = useState("");
  const [descrption, setDescrption] = useState("");
  const [, forceUpdate]  = useState("");

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);

    convertContentToHTML();
  };

  const convertContentToHTML = () => {
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(currentContentAsHTML);
  };

  
  const match = {
    params: {
      id: id,
    },
  };

  const [warning, setWarning] = useState("flase");
  const [successAlert, setSuccessAlert] = useState("fasle");

  const handleEdit = async () => {

    if(validator.current.allValid()){

      const formData = new FormData ;
      formData.append("description" , descrption);
      formData.append("content" , convertedContent) ;
      formData.append("token" , localStorage.getItem("token"));
      const { data, message, status } = await editPost(formData , id);
      if(status === 200){
        toast.info("Post updated !");
        history.replace(`/post/${id}`);

      }else{
        console.log(status , message);
      }

    }else{
      validator.current.showMessages();
      forceUpdate(1);

    }

  };

  const handleDelete = async () => {

    setWarning("false");
    // handle delete
    try {
      const token = localStorage.getItem("token")
      const { status } = await deletePost(id, token);

      if (status === 200) {

        setSuccessAlert("true");
        // change user posts count
        dispatch(deleteUserPost()) ;
        // get all posts
        dispatch(getAllPosts());
        await new Promise(r => setTimeout(r, 2000)); 
        history.replace("/");

      }
    } catch (er) {
      console.log(er);
    }
  };

  return (
    <Fragment>
      <Post match={match} />

      <div className="container mt-5">
        <div className="mt-5">
          <h6>Description</h6>
          <form action="" 
          className="form-group"
          onSubmit={(e) => {
            e.preventDefault();

          }}>

          <input 
          type="text" 
          name="description" 
          className="form-control mb-2"
          onChange={(e) => {

            setDescrption(e.target.value);
            validator.current.showMessageFor("description");

          }}
          />
          {validator.current.message("description" , descrption , "required|max:100")}

          </form>
        </div>
        
        <div className="text-left">
          
          <h6>Content</h6>
        </div>
        <div className="text-editor">
          <TextEditor
            onEditorStateChange={onEditorStateChange}
            editorState={editorState}
          />
        </div>
        <div className="mt-3 text-center">
          <button
            className="btn rounded-pill btn-outline-info m-2 "
            onClick={(e) => {
              handleEdit();
            }}
          >
            Update post content
          </button>
          <button
            className="btn rounded-pill btn-outline-danger m-2"
            onClick={() => {
              setWarning("true");
            }}
          >
            Delete tihs post
          </button>

          {/* alerts */}
          {warning === "true" ? (
            <SweetAlert
              warning
              showCancel
              confirmBtnText="Yes, delete it!"
              confirmBtnBsStyle="danger"
              title="Are you sure?"
              onConfirm={handleDelete}
              onCancel={() => {
                setWarning("flase");
              }}
              focusCancelBtn
            >
              Deleted post will no longer be recoverable
            </SweetAlert>
          ) : null}

          {successAlert === "true" ? (
            <SweetAlert
              success
              title="Deleted successfuly !"
              onConfirm={() => {
                setSuccessAlert("flase");
              }}
              onCancel={ () => {
                setSuccessAlert("fasle") ;
              }}
            >
            </SweetAlert>
          ) : null}
        </div>
      </div>
    </Fragment>
  );
};

export default withRouter(EditPost);
