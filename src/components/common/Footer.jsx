import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { isEmpty } from "lodash";

const Footer = () => {
  const user = useSelector((state) => state.user);

  return (
    <footer className="bg-light text-center text-black mt-5">
      <div className="container row p-4  d-flex align-items-center justify-content-center">
        <div className="col-lg-9">
          <section className="mb-3 mt-3">
            <h5>
              <i>Sign up for newsletter</i>
            </h5>
          </section>
          <section className="mb-3">
            <form action="">
              <div className="row justify-content-center">
                <div class="input-group col-md-5 col-12">
                  <input type="text" class="form-control" placeholder="Email" />
                  <div class="input-group-append">
                    <button class="btn btn-sm btn-outline-dark" type="submit">
                      <i class="fa fa-paper-plane"></i>
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </section>

          <section className="mb-4">
            <a
              className="btn btn-outline-primary btn-floating m-1"
              id="footer-icon"
              href="#!"
              role="button"
            >
              <i className="fa fa-facebook"></i>
            </a>

            <a
              className="btn btn-outline-info btn-floating m-1"
              id="footer-icon"
              href="#!"
              role="button"
            >
              <i className="fa fa-twitter"></i>
            </a>

            <a
              className="btn btn-outline-primary btn-floating m-1"
              id="footer-icon"
              href="#!"
              role="button"
            >
              <i className="fa fa-telegram"></i>
            </a>

            <a
              className="btn btn-outline-danger btn-floating m-1"
              id="footer-icon"
              href="#!"
              role="button"
            >
              <i className="fa fa-instagram"></i>
            </a>
          </section>
        </div>

        <div className="col-lg-3 order-1">
          <section className="">
            <div className="row d-flex">
              <div className="col-12  mb-4 mb-md-0">
                <h5>Quick access</h5>

                <ul className="list-unstyled mb-0">
                  <li>
                    <Link to="/" className="text-black">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/about" className="text-black disabled">
                      About us
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact" className="text-black disabled">
                      Contact us
                    </Link>
                  </li>
                  {!isEmpty(user) ? (
                    <li>
                      <Link to="/logout" className="text-black">
                        Logout
                      </Link>
                    </li>
                  ) : (
                    <Fragment>
                      <li>
                        <Link to="/login" className="text-black">
                          Login
                        </Link>
                      </li>
                      <li>
                        <Link to="/register" className="text-black">
                          Sign up
                        </Link>
                      </li>
                    </Fragment>
                  )}
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>

      <div className="text-center p-3" style={{ fontSize: "14px" }}>
        All rights reserved 2020 - 2021 ©
      </div>
    </footer>
  );
};

export default Footer;
