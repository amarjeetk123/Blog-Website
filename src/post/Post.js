import "./post.css"

function Post() {
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
            <span className="postTitle" >
            Lorem ipsum dolor sit amet, consectetur 
            </span>
            <hr />
            <span className="postDate">1 Hours ago</span>
         </div>
         <p className="poDis" >
         Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco labor aliquip ex ea commodo consequatconsectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in volupta
         </p>

    </div>
  )
}

export default Post