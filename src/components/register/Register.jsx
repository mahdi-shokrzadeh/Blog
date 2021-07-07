import React, { useState, useEffect, useRef } from "react";
import { useDispatch ,useSelector } from "react-redux";
import { hideLoading, showLoading } from "react-redux-loading-bar";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import SimpleReactValidator from "simple-react-validator";
import { isEmpty } from "lodash";
import { Redirect } from "react-router";



import { registerUser } from "../../services/userService";

const Register = ({history}) => {


  const user = useSelector(state => state.user)
  const dispatch = useDispatch() ;

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [, forceUpdate] = useState("");


  const validator = useRef(new SimpleReactValidator({

    element: (message) => <div style={{color: "red" , fontSize:"small"}}>{message}</div>

  }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reset = () => {
      setPassword("");
      setEmail("");
      setFullname("");
    };

    const user = {
        password ,
        email ,
        fullname
    }

    try {

        if(validator.current.allValid()){
          dispatch(showLoading());
            // const {data , message} = await registerUser(user);
            // if(status == 201){
            const {data , message , status} = await registerUser(user) ;

            if(status===200){
                toast.success(`Welcome ${user.fullname} !` , {
                    position : "top-right", 
                    closeOnClick: true
                })

                dispatch(hideLoading());
                history.replace("/login");
                reset();
            }
        }else{ 
            validator.current.showMessages();
            forceUpdate(1);
        }

    }catch(ex){
      console.log(ex);
        toast.error("Something went wrong with servers !", {
            position: "top-right"
        })
        dispatch(hideLoading());
    }


  };


  if(!isEmpty(user)){
    return <Redirect to="/" />
  }

  return (
    <div classNameName="row justify-content-center">
      <div
        className="col-md-7 col-lg-5 mx-auto mt-5"
        style={{ boxShadow: "0 10px 34px -5px rgb(0 0 0 / 24%)" }}
      >
        <div className="login-wrap p-4 p-md-5">
          <div className="icon d-flex align-items-center justify-content-center">
            <span className="fa fa-user-o fa-2x"></span>
          </div>
          <h4 className="text-center mt-2 mb-4">Sign up</h4>
          <form action="#" className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="fullname"
                className="form-control rounded-left"
                placeholder="Full name"
                onChange= { (e) => {
                    setFullname(e.target.value);
                    validator.current.showMessageFor("fullname")
                }}
              />
              {validator.current.message("fullname" , fullname , "required" )}
            </div>


            <div className="form-group">
              <input
                type="email"
                name="email"
                className="form-control rounded-left"
                placeholder="Email"
                onChange={ (e) => {
                    setEmail(e.target.value);
                    validator.current.showMessageFor("email") ;
                }}
              />
              {validator.current.message("email" , email , "required|email")}
            </div>

            <div className="form-group">
              <input
                type="password"
                name="password"
                className="form-control rounded-left"
                placeholder="Password"
                onChange={ (e) => {
                    setPassword(e.target.value);
                    validator.current.showMessageFor("password");
                }}
              />
              {validator.current.message("password" , password , "required|min:6")}
            </div>

            <div className="form-group">
              <button
                type="submit"
                className="form-control btn btn-success rounded submit px-3"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Register);
