import React from "react";
import { Link } from "react-router-dom";
import { isEmpty } from "lodash";
import { useSelector } from "react-redux";
import Posts from "../posts/Posts";

const IndexPage = () => {
  const user = useSelector((state) => state.user);

  return (
    <div className="container mt-4">
      <div className="main row" style={{ direction: "rtl" }}>
        {/* 1 */}

        <div
          className="col-md-4 col-12 mb-5 rounded side-bar"
          style={{ backgroundColor: "#F1F5F9" }}
        >
          {/* user panel */}
          {!isEmpty(user) ? (
            <div className="user-panel mb-4">
              <div className="ml-3">
                <Link to="/" id="user-panel-link">
                  <div className="row p-2 mb-2 rounded user-panel-item">
                    <div className="col-3">
                      <img
                        src="https://secure.gravatar.com/avatar/d54efb622ee21b88bf34bb09217bba4e.jpg?s=40&d=retro&r=g"
                        className="img img-fluid rounded"
                      />
                    </div>

                    <div className="col-9 text-right">
                      <p
                        className="bold text-dark m-0"
                        style={{ textDecoration: "none" }}
                      >
                        {user.fullname}
                      </p>
                      <span className="text-muted">shokrzadeh@</span>
                    </div>
                  </div>
                </Link>

                <Link to="/" id="user-panel-link" style={{ direction: "ltr" }}>
                  <div className="row p-2 rounded user-panel-item mb-2">
                    <div className="col-10">
                      <span className="text-dark">
                        <i class="fa fa-list mr-2"></i> Reading list
                      </span>
                    </div>

                    <div className="col-2">
                      <span className="badge badge-success">0</span>
                    </div>
                  </div>
                </Link>

                <Link
                  to="/new-post"
                  id="user-panel-link"
                  style={{ direction: "ltr" }}
                >
                  <div className="row p-2 rounded user-panel-item mb-2">
                    <div className="col-12">
                      <span className="text-dark">
                        <i class="fa fa-pencil mr-2"></i> Post new blog
                      </span>
                    </div>
                  </div>
                </Link>

                <Link to="/" id="user-panel-link" style={{ direction: "ltr" }}>
                  <div className="row p-2 rounded user-panel-item mb-2">
                    <div className="col-12">
                      <span className="text-dark">
                        <i class="fa fa-tasks mr-2 text-info"></i> Manage posted
                        blogs
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          ) : null}
          {/* popular tags */}

          <div className="popular-tags ml-3 mt-3" style={{ direction: "ltr" }}>
            <h5 className="text-dark " style={{ fontWeight: "bold" }}>
              # Popular tags
            </h5>
            <div className="tags">
              <Link to="/" id="popular-tag-link">
                <div className="ml-2 popular-tag rounded p-1 mb-2">
                  <span className="ml-3">#Laravel</span>
                </div>
              </Link>

              <Link to="/" id="popular-tag-link">
                <div className="ml-2 popular-tag rounded p-1 mb-2">
                  <span className="ml-3">#Adonis Js</span>
                </div>
              </Link>

              <Link to="/" id="popular-tag-link">
                <div className="ml-2 popular-tag rounded p-1 mb-2">
                  <span className="ml-3">#Node Js</span>
                </div>
              </Link>

              <Link to="/" id="popular-tag-link">
                <div className="ml-2 popular-tag rounded p-1 mb-2">
                  <span className="ml-3">#react</span>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* 2 */}


        <div className="col-md-8 col-12 posts" style={{ direction: "ltr" }}>
          <div className="header mb-4 border-bottom text-center">
            <h4>
              <i>Blogs</i>
            </h4>
          </div>

          <div className="container">
            {/* posts */}

            <Posts posts="" />
          
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
