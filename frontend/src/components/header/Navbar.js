import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context_api/Context";
import "./Navbar.css";
import { SERVER_URL } from "../../App";

export default function Navbar({removebox,setRemoveBox}) {
  const { user, dispatch } = useContext(Context);
  const publicFolder = `${SERVER_URL}/images/`;
  // console.log(user);

  const [showuserbox, setShowUserbox] = useState(false);
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  if(showuserbox){
    if(removebox){
    setShowUserbox(false)
    }
  }
 

  const handleHide = () => {
    if(removebox){
      setRemoveBox(false)
    }
    if (showuserbox) {
      setShowUserbox(false);
    }
  };

  return (
    <div className="container" onClick={handleHide}>
      <div className="main">

        <div className="left1">
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <h1>WriteME</h1>
          </Link>
        </div>

        <div>
        <input className="search-box" placeholder="Search for title, people, articals...." />
        </div>

        <div className="center">
          <ul className="navbar-list">
            <Link
              to="/write"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <li title="Blog Writing"> Write </li>
            </Link>

            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSc8AfiY3YAj34Uy_GZjB2Ke7iLKsZajZ9qwH5V38EbIdaxlug/viewform"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <li title="Feedback Form">Feedback</li>
            </a>
          </ul>
        </div>
        <div className="right" onClick={() => setShowUserbox(!showuserbox)}>
          <Link>
            {user ? (
              user.user.profilepicture ? (
                <img
                  className="image"
                  src={publicFolder + user.user.profilepicture}
                  alt="user"
                  title="Profile"
                />
              ) : (
                <img
                  src="https://vssmn.org/wp-content/uploads/2018/12/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
                  className="image"
                  alt="user"
                  title="Profile"
                />
              )
            ) : (
              <ul style={{ display: "flex", gap: "30px" }}>
                <Link to="/login" className="link2">
                  <li style={{ listStyle: "none", fontSize: "23px" }}>
                    {" "}
                    Login
                  </li>
                </Link>
                <Link to="/register" className="link2">
                  <li style={{ listStyle: "none", fontSize: "23px" }}>
                    {" "}
                    Register{" "}
                  </li>
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
            <div className="left2">
              <h2 className="name">AMARJEET KUMAR</h2>
              <h4 style={{ fontWeight: "400" }} className="username">
                @{user.user.username}{" "}
              </h4>
            </div>
          </div>

          <Link className="link" to={`/?user=${user.user.username}`}>
            <div className="second same">
              <div>
                <h2 style={{ fontWeight: "400" }}>My Blogs</h2>
                <h2
                  style={{
                    fontWeight: "600",
                    fontSize: "25px",
                    marginTop: "-15px",
                  }}
                >
                  {user.user.email}{" "}
                </h2>
              </div>
              <i
                style={{
                  marginLeft: "40px",
                  color: "#808080",
                  fontSize: "25px",
                }}
                className="fa-solid fa-greater-than"
              ></i>
            </div>
          </Link>

          <Link to={"/settings"} className="link">
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
            <i
              style={{ fontSize: "32px" }}
              className="fa-solid fa-right-from-bracket"
            ></i>
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
