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
                <span className="title">Categories</span>
                <ul className="sidebarList" >
                    {
                        catge.map((c, i) => (
                            <Link key={i} className="link" to={`/?cat=${c.name}`} >
                                <li className="sidebatListItem"> {c.name} </li>
                            </Link>
                        ))
                    }
                </ul>
            </div>
            <div className="item">
                <span className="title">Follow Us</span>
                <div className="sidebarSocail" >
                    <a className="link facebook-icon" href="https://www.facebook.com/amarkumar.aaryan.5"><i className="fab fa-facebook-square  sidebar_icon" ></i></a>
                    <a className="link twitter-icon" href="https://twitter.com/AMARJEE07266175"><i className="fab fa-twitter-square sidebar_icon" >  </i></a>
                    <a className="link instagram-icon" href="https://www.instagram.com/amarkumar.aaryan.5/"><i className="fab fa-instagram-square sidebar_icon" ></i></a>
                    <a className="link linkdin-icon" href="https://www.linkedin.com/in/amarjeet-kumar-46b79b236/"><i className="fa-brands fa-linkedin sidebar_icon"></i></a>
                </div>
            </div>
            <h2 className="writeme"> © 2023 Writeme</h2>
        </div>
    );
};

export default Sidebar;

