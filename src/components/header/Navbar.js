import { useState } from "react"
import { Link } from "react-router-dom"
import "./Navbar.css"

export default function Navbar() {
    const [user, setUser] = useState(false)
    return (
        < div className="container" >
            <div className="main" >
                <div className="left" >
                    <i className="fab fa-facebook-square  left_icon" >  </i>
                    <i className="fab fa-twitter-square left_icon" >  </i>
                    <i className="fab fa-pinterest-square left_icon" >  </i>
                    <i className="fab fa-instagram-square left_icon" >  </i>

                </div>
                <div className="center" >
                    <ul>
                        <Link to="/" style={{textDecoration:"none" , color:"inherit" }}>
                            <li > Home</li>
                        </Link>
                        <Link to="/write" style={{textDecoration:"none" , color:"inherit" }}>
                            <li > Write </li>
                        </Link>
                        <Link to="/" style={{textDecoration:"none" , color:"inherit" }}>
                            <li  > LogOut </li>
                        </Link>
                    </ul>

                </div>
                <div className="right"  style={{display:"flex" , alignItems:"center" }} >

                    {
                        user ?   <img className="image" src="https://th.bing.com/th/id/R.33d02c67b4a6e90abe2d7a58f764edd8?rik=JYmQaMVSULpYQg&riu=http%3a%2f%2fthewowstyle.com%2fwp-content%2fuploads%2f2015%2f01%2fnature-images.jpg&ehk=BNPsuSOUR7ATZ3EpRwxx1xFl7LUbO3tYlu1wFLCBrCE%3d&risl=&pid=ImgRaw&r=0" alt="imag" /> : 
                        <ul style={ {display:"flex" , gap:"1px"} } >
                             <Link to="/login" style={{textDecoration:"none" , color:"inherit" }}>
                            <li > Login</li>
                        </Link>
                        <Link to="/register" style={{textDecoration:"none" , color:"inherit" }}>
                            <li > Register </li>
                        </Link>
                        </ul>
                    }
<i class="fa-thin fa-magnifying-glass-plus"></i>


                </div>

            </div>
        </div>
    )
}

