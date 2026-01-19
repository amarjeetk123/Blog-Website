import "./post.css";
import { Link } from "react-router-dom";
import { SERVER_URL } from "../../App";
import { useEffect, useState } from "react";
import axios from "axios";
import parse from "html-react-parser";

function Post({ post }) {
  const publicFolder = `${SERVER_URL}/images/`;

  const [user, setUser] = useState("");

  const getUser = async () => {
    try {
      const payload = {
        username: post.username,
      };

      const response = await axios.post(
        `${SERVER_URL}/getuserbyusername/`,
        payload
      );

      setUser(response.data.user);
    } catch (error) {
      console.error(error);
    }
  };

  const parsedDescription = parse(post.description || "");

  useEffect(() => {
    if (post?.username) {
      getUser();
    }
  }, [post?.username]);

  return (
    <div className="container1">
      <div>
        <Link to={`/post/${post._id}`} className="link main-div">
          <div className="left">
            <div className="first">
              {user?.profilepicture ? (
                <img
                  className="image2"
                  src={publicFolder + user.profilepicture}
                  alt={`${post.username} profile`}
                />
              ) : (
                <div className="image2">
                  <i className="fa-solid fa-user"></i>
                </div>
              )}

              <div>
                <h2 className="username">{post.username}</h2>
                <h2 className="postdate">
                  {new Date(post.createdAt).toDateString()}
                </h2>
              </div>
            </div>

            <h2 className="postTitle">{post.title}</h2>

            <div className="discription">
              <span>
                {parsedDescription?.[0]?.props?.children?.slice(0, 3)}
              </span>
            </div>
          </div>

          <div className="right">
            <img
              className="postImage"
              src={
                post.photo
                  ? publicFolder + post.photo
                  : "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg"
              }
              alt={post.title}
            />
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Post;
