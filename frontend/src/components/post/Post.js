import "./post.css";

import { Link } from "react-router-dom";

import ReactReadMoreReadLess from "react-read-more-read-less";
import { SERVER_URL } from "../../App";

function Post({ post }) {
  // const publicFolder = "http://localhost:4001/images/"
  const publicFolder = `${SERVER_URL}/images/`;

  // console.log(post.photo)
  console.log(post)

  return (
    // <div className="post">
    //   {/* <Link to={`/post/${post._id}`} className="link">
    //     {post.photo ? <img
    //       className="postImage"
    //       src={publicFolder + post.photo}
    //       alt="Post Image"
    //     /> :
    //       <img src="https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg"
    //         className="postImage"  alt="POST Image"
    //       />}
    //   </Link> */}
    //   {/*
    //   <div className="postInfo" >
    //     <div className="postCast" >
    //       <span className="postCat" >Music</span>
    //       <span className="postCat" >Life</span>
    //     </div>
    //     <Link to={`/post/${post._id}`} className="link" >
    //       <span className="postTitle" >  {post.title}  </span>
    //     </Link>

    //     <hr />
    //     <span className="postDate"> {new Date(post.createdAt).toDateString()} </span>
    //   </div> */}
    //   {/* <p className="poDis" >
    //     <ReactReadMoreReadLess charLimit={120}
    //       readMoreText={"Read more ▼"}
    //       readLessText={"Read less ▲"}
    //       readMoreStyle={{ color:"#008080" , cursor:"pointer" }}
    //       readLessStyle={{ color:"#008080" , cursor:"pointer" }}
    //       >
    //       {post.description}
    //     </ReactReadMoreReadLess>

    //   </p> */}

    // </div>

    <div className="container1">
      <Link to={`/post/${post._id}`} className="link main-div">
        <div className="left">
          <div className="first">
            {false? (
              <img
                className="image2"
                src={publicFolder + "avc"}
                alt="user"
              />
            ) : (
              <img
                src="https://vssmn.org/wp-content/uploads/2018/12/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
                className="image2"
                alt="user"
              />
            )}
          <div>
          {<h2 className="username">{post.username}</h2>}
            <h2 className="postdate">{new Date(post.createdAt).toDateString()}</h2>
          </div>
          </div>

          <h2 className="postTitle">{post.title} </h2>
          {<h2 className="poDis" >
            <ReactReadMoreReadLess charLimit={170}
              readMoreText={"Read more ▼"}
              readLessText={"Read less ▲"}
              readMoreStyle={{ color: "#008080", cursor: "pointer" }}
              readLessStyle={{ color: "#008080", cursor: "pointer" }}
            >
              {post.description}
            </ReactReadMoreReadLess>

          </h2>}
        </div>

        <div className="right">
          {post.photo ? (
            <img
              className="postImage"
              src={publicFolder + post.photo}
              alt="Post Image"
            />
          ) : (
            <img
              src="https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg"
              className="postImage"
              alt="POST Image"
            />
          )}
        </div>
      </Link>
    </div>
  );
}

export default Post;
