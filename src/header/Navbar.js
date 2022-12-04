import "./Navbar.css"

export default  function Navbar() {
  return (
 < div className="container" >
    <div  className="main" >
        <div className="left" >
            <i className="fab fa-facebook-square  left_icon" >  </i>
            <i className="fab fa-twitter-square left_icon" >  </i>
            <i className="fab fa-pinterest-square left_icon" >  </i>
            <i className="fab fa-instagram-square left_icon" >  </i>

        </div>
        <div className="center" >
            <ul>
                <li > Home</li>
                <li > About</li>
                <li > Contact</li>
                <li > Write </li>
                <li > LogOut</li>

            </ul>

        </div>
        <div  className="right">

            <img className="image" src="https://th.bing.com/th/id/R.33d02c67b4a6e90abe2d7a58f764edd8?rik=JYmQaMVSULpYQg&riu=http%3a%2f%2fthewowstyle.com%2fwp-content%2fuploads%2f2015%2f01%2fnature-images.jpg&ehk=BNPsuSOUR7ATZ3EpRwxx1xFl7LUbO3tYlu1wFLCBrCE%3d&risl=&pid=ImgRaw&r=0" alt="imag" /> 
            <i className="fab fa-search  search-icon" >  </i>
        

        </div>

    </div>
 </div>
  )
}

