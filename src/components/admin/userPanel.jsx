import { isEmpty } from "lodash";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router";
import { toast } from "react-toastify";
import { getUsers } from "../../actions/users";
import { deleteUser, demoteUser, promoteUser } from "../../services/userService";

const UserPanel = ({ history }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("token") && localStorage.getItem("user")) {
      if (JSON.parse(localStorage.getItem("user")).role !== "Manager") {
        history.replace("/404");
      } else {
        dispatch(getUsers(localStorage.getItem("token")));
      }
    } else {
      history.replace("/404");
    }
  }, []);

  const users = useSelector((state) => state.users);
  const btnStyle = { fontSize: "11px" };

  const handleChange = async (type , userId , userFullname) => {

    const token = localStorage.getItem("token") ;

    switch (type) {

      case "promote":

        const response = await promoteUser(userId , token) ;
        if(response.status === 200){
          toast.info(`${userFullname} promoted successfully !` ,)
          dispatch(getUsers(token))
        }
        break;
    
      case "demote":

        const response1 = await demoteUser(userId , token);
        if(response1.status === 200) {
          toast.info(`${userFullname} demoted successfully !`);
          dispatch(getUsers(token))
        }
        break;

      case "delete" :
        const response2 = await deleteUser(userId , token);
        if (response2.status === 200 ){
          toast.info(`${userFullname} deleted successfully !`);
          dispatch(getUsers(token))
        }
        break


    }
  }



  return (
    <div className="mt-5">
      <div className="header text-center">
        <i>
          <h4>Users</h4>
        </i>
      </div>
      <div className="mt-3">
        <table class="table table-striped">
          <thead>
            <tr className="text-center">
              <th scope="col">name</th>
              <th scope="col">email</th>
              <th scope="col">posts</th>
              <th scope="col">role</th>
              <th scope="col">handle</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr className="text-center" key={i}>
                <th>{user.fullname}</th>
                <td>{user.email}</td>
                <td>
                  <span className="badge badge-info p-1 rounded">{user.posts_count}</span>
                </td>
                <td>
                  
                  <span className={`badge ${user.role === "Admin" ? "badge-warning" : "badge-primary" } p-1`}>{user.role}</span>
                </td>
                <td>
                  <div>
                    <a
                      className={`btn btn-sm btn-outline-success rounded-pill m-1 ${user.role==="Admin" ? "disabled" : null}`}
                      style={btnStyle}
                      onClick={(e) => {
                        e.preventDefault();
                        handleChange("promote" , user.id , user.fullname)
                      }}
                    >
                      Promote
                    </a>
                    <a
                      className={`btn btn-sm btn-outline-danger rounded-pill m-1 ${user.role==="User" ? "disabled" : null}`}
                      style={btnStyle}
                      onClick={ (e) => {
                        e.preventDefault();
                        handleChange("demote" , user.id , user.fullname)
                        
                      }}
                    >
                      Demote
                    </a>
                    <button
                      className="btn btn-sm btn-danger rounded-pill m-1"
                      style={btnStyle}
                      onClick={ (e) => {
                        e.preventDefault();
                        handleChange("delete" , user.id , user.fullname);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default withRouter(UserPanel);
