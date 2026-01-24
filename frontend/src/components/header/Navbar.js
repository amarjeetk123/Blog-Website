import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context_api/Context";
import "./Navbar.css";
import { SERVER_URL } from "../../App";
import { useCurrentURL } from "../../services/utils.service";

export default function Navbar({ removebox, setRemoveBox, setSearchInput, searchInput }) {
  const { user, dispatch } = useContext(Context);
  const publicFolder = `${SERVER_URL}/images/`;
  const currentUrl = useCurrentURL();
  // console.log(user);

  const [showuserbox, setShowUserbox] = useState(false);
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  if (showuserbox) {
    if (removebox) {
      setShowUserbox(false)
    }
  }

  const handleHide = () => {
    if (removebox) {
      setRemoveBox(false)
    }
    if (showuserbox) {
      setShowUserbox(false);
    }
  };

  const cleanInputBox = () => {
    setSearchInput("")
  }

  console.log(currentUrl, "getCurrentURL") // currentUrl.fullUrl

  return (
    <div className="container" onClick={handleHide}>
      <div className="main">
        <div className="left" onClick={cleanInputBox} >
        <div>
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <h1>WriteME</h1>
          </Link>
        </div>

          {currentUrl.fullUrl == "/" &&
            <div>
              <input className="search-box" placeholder="Search for title, people, articals...."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    // console.log(searchInput)
                    // handleSearch(e)
                  };
                }}
              />
            </div>
          }
        </div>

        <div className="right">

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

          <div onClick={() => setShowUserbox(!showuserbox)}>
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
                  <i className="fa-solid fa-user user-icon"></i>
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
                <i className="fa-solid fa-user user-icon-2"></i>
              )}
            </div>
            <span className="user-name"> {user.user.fullname} </span>
          </div>

          <Link className="link" to={`/?user=${user.user.username}`}>
            <div className="second same">
              <i className="fa-solid fa-blog"></i>
              <span className="my-blog">My Blogs</span>
            </div>
          </Link>

          <Link to={"/settings"} className="link">
            <div className=" same">
              <i
                className="fa-regular fa-circle-user accout-icon"
              ></i>
              <span
              >
                Account Settings
              </span>
            </div>
          </Link>
          <div className="same" style={{ color: "red" }}>
            <i
              className="fa-solid fa-right-from-bracket log-out-icon"
            ></i>
            <span
              onClick={handleLogout}
            >
              Log Out
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
