import React from "react";
import { Link } from "react-router-dom";
import { isEmpty } from "lodash";
import { useSelector } from "react-redux";

const Posts = ({posts}) => {

  return (
    <div className="card border mb-3 post">
      <div className="author mb-3 ml-3 mt-2">
        <img
          src="https://secure.gravatar.com/avatar/d54efb622ee21b88bf34bb09217bba4e.jpg?s=40&d=retro&r=g"
          alt=""
          className="img img-fluid rounded-pill"
        />
        <Link to="" className="ml-1" style={{ textDecoration: "none" }}>
          <span className="text-muted"> Mahdi shokrzadeh</span>
        </Link>
      </div>

      <div className="container">
        <img
          class="card-img-top img-fluid rounded"
          src="https://img.freepik.com/free-vector/blue-copy-space-digital-background_23-2148821698.jpg?size=626&ext=jpg"
          alt="Card image cap"
        />
      </div>

      <div className="card-body text-dark mt-0">
        <div className="text-left title mt-3">
          <Link to="">
            <h5 className="text-dark">Post title</h5>
          </Link>
        </div>
        <p className="card-text">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
      </div>

      <div class="card-footer text-muted p-2">
        <div className="row">
          <div className="col-10">
            <span className="date ml-2">
              <i>11 sep</i>
            </span>
            <span
              className="badge badge-info ml-3 p-1"
              style={{ fontWeight: 350 }}
            >
              read in 5 min
            </span>
          </div>
          <div className="col-2">
            <span>
              <i className="fa fa-heart mr-2 like"></i>3
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Posts;
