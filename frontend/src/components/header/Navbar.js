import { useContext } from "react"
import { Link } from "react-router-dom"
import { Context } from "../../context_api/Context"
import "./Navbar.css"

export default function Navbar() {
    const { user, dispatch } = useContext(Context)

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" })
    }
    // console.log(user.user)
    return (
        < div className="container" >
            <div className="main" >
                <div className="left" >
             
                    <Link to="https://github.com/amarjeetk123" className="link">
                        <i className="fa-brands fa-square-github left_icon"></i>
                    </Link>
                          
                    <Link className="link"  to="https://www.instagram.com/amarkumar.aaryan.5/"  >
                        <i className="fab fa-twitter-square left_icon" >  </i>
                    </Link>

                    <Link className="link"  to="https://www.linkedin.com/in/amarjeet-kumar-46b79b236/"  >
                    <i className="fa-brands fa-linkedin  left_icon"></i>
                    </Link>

                    <Link to="https://www.instagram.com/amarkumar.aaryan.5/" className="link">
                    <i className="fab fa-instagram-square left_icon" >  </i>
                    </Link>
                    <Link  className="link"  to="https://www.facebook.com/amarkumar.aaryan.5"  >
                        <i className="fab fa-facebook-square  left_icon" >  </i>
                    </Link>


                </div>
                <div className="center" >
                    <ul>
                        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                            <li > Home</li>
                        </Link>
                        <Link to="/write" style={{ textDecoration: "none", color: "inherit" }}>
                            <li > Write </li>
                        </Link>

                        <li onClick={handleLogout}  >  {user && "LogOut"}   </li>

                    </ul>

                </div>
                <div className="right" >

                    {
                        user ? <img className="image" src={user.user.profilepicture} alt="image." /> :
                            <ul style={{ display: "flex", gap: "1px" }} >
                                <Link to="/login" style={{ textDecoration: "none", color: "inherit" }}>
                                    <li > Login</li>
                                </Link>
                                <Link to="/register" style={{ textDecoration: "none", color: "inherit" }}>
                                    <li > Register </li>
                                </Link>
                            </ul>
                    }

                    <i className="fa-solid fa-magnifying-glass " id="search_icon"></i>


                </div>

            </div>
        </div>
    )
}

