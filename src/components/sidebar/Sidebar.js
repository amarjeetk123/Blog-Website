import "./sidebar.css";

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="item">
                <span className="title">About me</span>
                <img src="https://th.bing.com/th/id/OIP.u5jd2IbRxY-2XbqPYC4AAgHaEo?pid=ImgDet&rs=1" />
                <p>Lorem ima kidjk kdkd dkdd ddkdkd dkdkd kkd ddk ddk</p>
            </div>
            <div className="item">
                <span className="title">Categories</span>
                <ul className="sidebarList" >
                    <li className="sidebatListItem">Life</li>
                    <li className="sidebatListItem">Music</li>
                    <li className="sidebatListItem">Style</li>
                    <li className="sidebatListItem">Sports</li>
                    <li className="sidebatListItem">Tech</li>
                    <li className="sidebatListItem">Cinema</li>
                </ul>
            </div>
            <div className="item">
                <span className="title">Follow Us</span>
                <div className="sidebarSocail" >
                <i className="fab fa-facebook-square  sidebar_icon" >  </i>
            <i className="fab fa-twitter-square sidebar_icon" >  </i>
            <i className="fab fa-pinterest-square sidebar_icon" >  </i>
            <i className="fab fa-instagram-square sidebar_icon" >  </i>


                </div>
            </div>
        </div>
    );
};

export default Sidebar;
