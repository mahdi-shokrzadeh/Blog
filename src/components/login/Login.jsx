import React, { useRef, useState } from "react";
import SimpleReactValidator from "simple-react-validator";
import { toast } from "react-toastify";
import { withRouter } from "react-router-dom";
import { isEmpty } from "lodash";
import { Redirect } from "react-router-dom";
import { loginUser } from "../../services/userService.js";
import { hideLoading, showLoading } from "react-redux-loading-bar";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../actions/user.js";


const Login = ({history}) => {
  
  const user = useSelector(state => state.user);

  const dispatch = useDispatch() ;

  const validator = useRef(new SimpleReactValidator({
    element: (message) =>  <div style={{color:"red" , fontSize:"small"}}>{message}</div>
  }));

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [, forceUpdate] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    const user = {
      email,
      password,
    };

    const reset = () => {
      setEmail("") ;
      setPassword("") ;
    }

    try {

      if (validator.current.allValid()) {

        dispatch(showLoading());

        const { status , data } = await loginUser(user);

        if (status === 202) {
          toast.success("You entered successfuly !", {
            position: "top-right",
          });
          dispatch(hideLoading());
          
          localStorage.setItem("token", data.token.token);
          localStorage.setItem("user" , JSON.stringify(data.user));
          dispatch(addUser(data.user));
          history.replace("/");
          reset();

        }

      } else {

        validator.current.showMessages();
        forceUpdate(1);

      }
    } catch (ex) {
      console.log(ex);
      toast.error("Invalid email or password !", {
        position: "top-right",
      });
      dispatch(hideLoading());

    }

  };


  if(!isEmpty(user)){
    return(
      <Redirect to="/" />
    );
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
          <h4 className="text-center mt-2 mb-4">Log in</h4>
          <form action="#" className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="email"
                name="email"
                className="form-control rounded-left"
                placeholder="Email"
                onChange={ (e) => {
                  setEmail(e.target.value);
                  validator.current.showMessageFor("email");
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
            

            <div className="form-group d-md-flex">
              <div className="">
                <input
                  type="checkbox"
                  className="form-check-input ml-2"
                  id="exampleCheck1"
                />
                <label className="form-check-label ml-4" for="exampleCheck1">
                  remember me
                </label>
              </div>
            </div>
            <div className="form-group">
              <button
                type="submit"
                className="form-control btn btn-primary rounded submit px-3"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Login);
