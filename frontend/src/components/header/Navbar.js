import { useContext } from "react"
import { Link } from "react-router-dom"
import { Context } from "../../context_api/Context"
import "./Navbar.css"
import { SERVER_URL } from "../../App"

export default function Navbar() {
    const { user, dispatch } = useContext(Context)
    const publicFolder = `${SERVER_URL}/images/`

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" })
    }
    // console.log("user",user.user.profilepicture)
    return (
        < div className="container" >
            <div className="main" >
                <div className="left" >
<h1>WriteME</h1>
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
                        <a href="https://docs.google.com/forms/d/e/1FAIpQLSc8AfiY3YAj34Uy_GZjB2Ke7iLKsZajZ9qwH5V38EbIdaxlug/viewform"  style={{ textDecoration: "none", color: "inherit" }}>
                            <li>Feedback</li>
                        </a>
                    </ul>

                </div>
                <div className="right" >
                    <Link  to={"/settings"} >
                        {
                            user ?
                                user.user.profilepicture ? <img className="image" src={publicFolder + user.user.profilepicture} alt="user" />
                                    : <img src="https://vssmn.org/wp-content/uploads/2018/12/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
                                        className="image" alt="user"
                                    />

                                :
                                <ul style={{ display: "flex", gap: "1px" }} >
                                    <Link to="/login" className="link2">
                                        <li className="link" > Login</li>
                                    </Link>
                                    <Link to="/register" className="link2">
                                        <li > Register </li>
                                    </Link>
                                </ul>
                        }

                    </Link>


                </div>

            </div>
        </div>
    )
}

