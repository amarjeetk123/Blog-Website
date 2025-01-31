import "./post.css";
import { Link } from "react-router-dom";
// import ReactReadMoreReadLess from "react-read-more-read-less";
import { SERVER_URL } from "../../App";
import { useEffect, useState } from "react";
import axios from "axios";
import parse from "html-react-parser";


function Post({ post }) {

  const publicFolder = `${SERVER_URL}/images/`;
  console.log(publicFolder)

  const [user, setUser] = useState("")
  const getUser = async () => {
    try {
      const data = {
        username: post.username,
      }
      const res = await axios.post(`${SERVER_URL}/getuserbyusername/`, data);
      console.log(res,"res")
      setUser(res.data.user)
    } catch (error) {
      // console.log(error)
    }
  }

  const res = parse(post.description)
  useEffect(() => {
    getUser();
  }, [post.username]);
  // console.log(res[0]?.props?.children)
  return (
    <div className="container1">
      <div>
        <Link to={`/post/${post._id}`} className="link main-div">
          <div className="left">
            <div className="first">
              {user.profilepicture ? (
                <img
                  className="image2"
                  src={publicFolder + user.profilepicture}
                  alt="user"
                />
              ) : (
                <div  className="image2">
                  <img
                  src="https://vssmn.org/wp-content/uploads/2018/12/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
                  alt="user"
                />
                </div>
              )}
              <div>
                {<h2 className="username">{post.username}</h2>}
                <h2 className="postdate">{new Date(post.createdAt).toDateString()}</h2>
              </div>
            </div>

            <h2 className="postTitle">{post.title} </h2>

            <div className="discription">
              <span >
                {res[0]?.props?.children.slice(0,3)}
                {/* <br />
                {res[1]?.props?.children} */}
                {/* <br />
                {res[2]?.props?.children} */}
              </span>
            </div>

          </div>

          <div className="right">
            {post.photo ? (
              <img
                className="postImage"
                src={publicFolder + post.photo}
                alt="Post Img"
              />
            ) : (
              <img
                src="https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg"
                className="postImage"
                alt="POST Img"
              />
            )}
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Post;

