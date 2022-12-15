import "./post.css"
import {Link} from "react-router-dom"


function Post({post}) {

  const publicFolder = "http://localhost:4001/images/"
  
  return (
    <div className="post">
      <Link to={`/post/${post._id}`}  className="link">
      { post.photo && <img 
        className="postImage"
        src={publicFolder + post.photo }
        alt=""
         /> }
      </Link>
      
         <div className="postInfo" >
            <div className="postCast" >
                <span className="postCat" >Music</span>
                <span className="postCat" >Life</span>
            </div>
            <Link to={`/post/${post._id}`}  className="link" >
            <span className="postTitle" >  { post.title }  </span>
            </Link>
          
            <hr />
            <span className="postDate"> { new Date(post.createdAt).toDateString()  } </span>
         </div>
         <p className="poDis" >
          {post.description}
         </p>

    </div>
  )
}

export default Post