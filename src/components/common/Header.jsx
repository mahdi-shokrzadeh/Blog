import React, { Fragment } from "react";
import { isEmpty } from "lodash";
import { useSelector } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";

const Header = (props) => {
  const user = useSelector((state) => state.user);

  const activeSyle = {
    borderBottom: "3px solid",
    borderColor: "teal",
    borderRadius: "2px",
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <NavLink className="navbar-brand" to="/">
        Blog
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarsExample05"
        aria-controls="navbarsExample05"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarsExample05">
        <ul className="navbar-nav">
          <li className="nav-item text-center">
            <NavLink className="nav-link" exact to="/" activeStyle={activeSyle}>
              Home
            </NavLink>
          </li>
          <li className="nav-item text-center">
            <NavLink
              className="nav-link"
              exact
              to="/about"
              activeStyle={activeSyle}
            >
              About us
            </NavLink>
          </li>
          <li className="nav-item text-center">
            <NavLink
              exact
              className="nav-link"
              to="/contact"
              activeStyle={activeSyle}
            >
              Contact
            </NavLink>
          </li>
        </ul>

        <ul className="ml-auto m-0 navbar-nav">
          {!isEmpty(user) ? (
            <li className="nav-item text-center">
              <NavLink to="/logout" exact className="nav-link">
                <button className="btn btn-sm btn-outline-primary m-0">
                  Log out
                </button>
              </NavLink>
            </li>
          ) : (
            <Fragment>
              <li className="nav-item text-center">
                <NavLink to="/login" exact className="nav-link">
                  <button className="btn btn-sm btn-outline-success m-0">
                    Login
                  </button>
                </NavLink>
              </li>
              <li className="nav-item text-center">
                <NavLink to="/register" exact className="nav-link">
                  <button className="btn btn-sm btn-outline-primary m-0">
                    sign up
                  </button>
                </NavLink>
              </li>
            </Fragment>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default withRouter(Header);
