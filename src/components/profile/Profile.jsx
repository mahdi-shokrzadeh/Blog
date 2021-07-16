import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getProfilePic, getUserProfile } from "../../services/userService";
import Posts from "../posts/Posts";

const Profile = () => {
  const { id } = useParams();
  const [user, setUser] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(async () => {
    try {
      const { status, data } = await getUserProfile(id);

      if (status === 200) {
        setPosts(data.posts);
        setUser(data.user);
      }
    } catch (er) {
      console.log(er);
    }
  }, []);

  return (
    <div className="mt-5">
      <div className="row">
        <div className="col-12 col-md-8">
          <div className="header text-center">
            <h5>Last 5 articles</h5>
          </div>
          <hr />
          <div className="posts">
            <Posts posts={posts} />
          </div>
        </div>

        <div className="col-12 col-md-4 text-center">
          <div className="card text-center rounded" style={{ width: "18rem" }}>
            <img
              className="card-img-top rounded"
              src={getProfilePic(user.id)}
              alt="Card image cap"
            />
            <div className="card-body py-2">
              <h5 className="card-title m-0" style={{ fontSize: "18px" }}>
                {user.fullname}
              </h5>
              <span
                className="card-text text-dark"
                style={{ fontSize: "13px" }}
              ></span>
            </div>
            <div className="mt-2">
              <div className="text-muted mb-2" style={{ fontSize: "15px" }}>
                {user.description}
              </div>

              <div className="text-black-50" style={{ fontSize: "15px" }}>
                Published{" "}
                <span
                  className="badge badge-success badge-pill mr-1 ml-1 "
                  style={{ fontWeight: "300" }}
                >
                  {user.posts_count}
                </span>{" "}
                article.
              </div>
            </div>
            <div className="card-footer py-2 mt-2">
              <small className="text-muted">
                Joined on <i>{user.created_at}</i>
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
