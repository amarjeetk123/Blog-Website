import "./post.css"
import Post from "../post/Post"

const Posts = ( { posts } ) => {
  return (
    <div className="posts">

      <div className="post-div">
      {  posts.map((p , i) => (
         <Post post={p} key={i} /> 
      )) }
      </div>
      
        </div>
  )
}

export default Posts