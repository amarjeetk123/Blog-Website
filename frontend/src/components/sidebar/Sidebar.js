import axios from "axios";
import { useEffect, useState } from "react";
import "./sidebar.css";
import { Link } from "react-router-dom";
import { SERVER_URL } from "../../App";

const Sidebar = () => {

    const [catge, setCatge] = useState([10]);

    const getAllCategory = async () => {
        // const res = await axios.get("/getallcategory");
        const res = await axios.get(`${SERVER_URL}/getallcategory`);
        // console.log(res.data.category)
        setCatge(res.data.category)
    }
    useEffect(() => {
        getAllCategory()
    }, [])

  

    return (
        <div className="sidebar">
            <div className="item">
                <span className="title">About me</span>
                {/* <img src="https://th.bing.com/th/id/OIP.u5jd2IbRxY-2XbqPYC4AAgHaEo?pid=ImgDet&rs=1" /> */}
                <p>Lorem ima kidjk kdkd dkdd ddkdkd dkdkd kkd ddk ddk</p>
            </div>
            <div className="item">
                <span className="title">Categories</span>
                <ul className="sidebarList" >
                    {
                        catge.map((c , i) => (
                            <Link key={i}  className="link" to={`/?cat=${c.name}`} >
                            <li  className="sidebatListItem"> {c.name} </li>
                            </Link>
                        ))
                    }
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
