import { useContext } from "react"
import { Link } from "react-router-dom"
import { Context } from "../../context_api/Context"
import "./Navbar.css"

export default function Navbar() {
    const { user, dispatch } = useContext(Context)

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" })
    }
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
                        user ? <img className="image" src={user.profilepicture} alt="imag" /> :
                            <ul style={{ display: "flex", gap: "1px" }} >
                                <Link to="/login" style={{ textDecoration: "none", color: "inherit" }}>
                                    <li > Login</li>
                                </Link>
                                <Link to="/register" style={{ textDecoration: "none", color: "inherit" }}>
                                    <li > Register </li>
                                </Link>
                            </ul>
                    }

                    <i class="fa-solid fa-magnifying-glass " id="search_icon"></i>


                </div>

            </div>
        </div>
    )
}

