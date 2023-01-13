import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context_api/Context";
import "./Navbar.css";
import { SERVER_URL } from "../../App";

export default function Navbar() {
    const { user, dispatch } = useContext(Context);
    const publicFolder = `${SERVER_URL}/images/`;
    // console.log(user);
   
    const [showuserbox  , setShowUserbox] = useState(false)
    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
    };
    // console.log("user",user.user.profilepicture)
    return (
        <div className="container"  >
            <div className="main">
                <div className="left">
                    <h1>WriteME</h1>
                </div>
                <div className="center">
                    <ul>
                        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                            <li> Home</li>
                        </Link>
                        <Link
                            to="/write"
                            style={{ textDecoration: "none", color: "inherit" }}
                        >
                            <li> Write </li>
                        </Link>
                        <li onClick={handleLogout}> {user && "LogOut"} </li>
                        <a
                            href="https://docs.google.com/forms/d/e/1FAIpQLSc8AfiY3YAj34Uy_GZjB2Ke7iLKsZajZ9qwH5V38EbIdaxlug/viewform"
                            style={{ textDecoration: "none", color: "inherit" }}
                        >
                            <li>Feedback</li>
                        </a>
                    </ul>
                </div>
                <div className="right" onClick={() => setShowUserbox(!showuserbox) }  >
                    <Link >
                        {user ? (
                            user.user.profilepicture ? (
                                <img
                                    className="image"
                                    src={publicFolder + user.user.profilepicture}
                                    alt="user"
                                />
                            ) : (
                                <img
                                    src="https://vssmn.org/wp-content/uploads/2018/12/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
                                    className="image"
                                    alt="user"
                                />
                            )
                        ) : (
                            <ul style={{ display: "flex", gap: "1px" }}>
                                <Link to="/login" className="link">
                                    <li className="link"> Login</li>
                                </Link>
                                <Link to="/register" className="link">
                                    <li> Register </li>
                                </Link>
                            </ul>
                        )}
                    </Link>
                </div>
            </div>

            {user && showuserbox && (
                <div className="user-box">
                    <div className="first same">
                        <div>
                            {user.user.profilepicture ? (
                                <img
                                    className="image"
                                    src={publicFolder + user.user.profilepicture}
                                    alt="user"
                                />
                            ) : (
                                <img
                                    src="https://vssmn.org/wp-content/uploads/2018/12/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
                                    className="image"
                                    alt="user"
                                />
                            )}
                        </div>
                        <div className="left">
                            <h2 className="name">AMARJEET KUMAR</h2>
                            <h4 style={{ fontWeight: "400" }} className="username">
                                @{user.user.username}{" "}
                            </h4>
                        </div>
                    </div>
                    
                    <Link  className="link" to={`/?user=${user.user.username}`} onClick={() => setShowUserbox(false) } >
                    <div className="second same">
                        <div>
                            <h2 style={{ fontWeight: "400" }}>My Blogs</h2>
                            <h2 style={{ fontWeight: "600", fontSize: "25px" }}>
                                {user.user.email}{" "}
                            </h2>
                        </div>
                        <i
                            style={{ marginLeft: "40px", color: "#808080", fontSize: "25px" }}
                            className="fa-solid fa-greater-than"
                        ></i>
                    </div>
                    </Link>
                 
                    <Link to={"/settings"} className="link" onClick={() => setShowUserbox(false) } >
                        <div className=" same">
                            <i
                                style={{ color: "#808080", fontSize: "30px" }}
                                className="fa-regular fa-circle-user"
                            ></i>
                            <h2
                                style={{
                                    fontSize: "22px",
                                    marginLeft: "-4px",
                                    fontWeight: "500",
                                }}

                            >
                                Account Settings
                            </h2>
                        </div>
                    </Link>
                    <div className="same" style={{ color: "red", fontSize: "32px" }}>

                        <i style={{ fontSize: "32px" }} className="fa-solid fa-right-from-bracket"></i>
                        <h2
                            style={{
                                fontSize: "22px",
                                marginLeft: "-6px",
                                fontWeight: "500",
                            }}
                            onClick={handleLogout}
                        >
                            Log Out
                        </h2>
                    </div>
                </div>
            )}
        </div>
    );
}
