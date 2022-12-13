import "./post.css"
import {Link} from "react-router-dom"


function Post({post}) {
  
  return (
    <div className="post">
        <img 
        className="postImage"
        src="https://th.bing.com/th/id/R.7f34a70a5bee79488309934920d316cb?rik=IRJI6pSFo6OI%2fQ&riu=http%3a%2f%2fallpicts.in%2fwp-content%2fuploads%2f2018%2f03%2fNatural-Images-HD-1080p-Download-with-Keyhole-Arch-at-Pfeiffer-Beach.jpg&ehk=JPI0MFI04N62Xtd7MT1P2sw4vJgwODLsp1EcpgvuGFo%3d&risl=&pid=ImgRaw&r=0"
        alt=""
         />
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