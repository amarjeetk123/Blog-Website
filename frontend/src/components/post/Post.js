import "./post.css"
import { Link } from "react-router-dom"
import ReactReadMoreReadLess from "react-read-more-read-less";


function Post({ post }) {

  const publicFolder = "http://localhost:4001/images/"

  return (
    <div className="post">
      <Link to={`/post/${post._id}`} className="link">
        {post.photo ? <img
          className="postImage"
          src={publicFolder + post.photo}
          alt=""
        /> :
          <img src="https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg"
            className="postImage"
          />}
      </Link>

      <div className="postInfo" >
        <div className="postCast" >
          <span className="postCat" >Music</span>
          <span className="postCat" >Life</span>
        </div>
        <Link to={`/post/${post._id}`} className="link" >
          <span className="postTitle" >  {post.title}  </span>
        </Link>

        <hr />
        <span className="postDate"> {new Date(post.createdAt).toDateString()} </span>
      </div>
      <p className="poDis" >
        <ReactReadMoreReadLess charLimit={120}
          readMoreText={"Read more ▼"}
          readLessText={"Read less ▲"}
          readMoreStyle={{ color:"#3DBE29" , cursor:"pointer" }}
          readLessStyle={{ color:"#3DBE29" , cursor:"pointer" }}
          >
          {post.description}
        </ReactReadMoreReadLess>

      </p>

    </div>
  )
}

export default Post