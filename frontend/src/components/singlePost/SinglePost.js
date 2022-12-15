import "./SinglePost.css"
import { Link, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"

import axios from "axios"

const SinglePost = () => {

    const publicFolder = "http://localhost:4001/images/"

    const location = useLocation()
    // console.log(location)   console.log(location.pathname.split("/")[2]);
    const path = location.pathname.split("/")[2]

    const [post, setPost] = useState({})

    const getPost = async () => {
        const res = await axios.get("/getpost/" + path);
        console.log(res.data.post)
        setPost(res.data.post)

    }
    useEffect(() => {
        getPost();
    }, [path])
    console.log("second", post.photo)
    return (
        <div className="singlePost" >

            <div className="singlePosetWrapper" >
               <div className="image-div">
               {post.photo && (
                    <img src={publicFolder + post.photo}
                        className="singlepageimage"
                    />
                )}
               </div>

                <h1 className="singlePostTitle"> {post.title}
                    <div className="SinglePagecon">
                        <i className="fa-regular fa-pen-to-square editIcon"></i>
                        <i className="fa-solid fa-trash deleteIcon  "></i>
                    </div>
                </h1>
                <div className="postInformation">
                    <span className="postAuthor" >   Author:
                        <Link to={`/?user=${post.username}`} className="link" >
                            <b>{post.username}</b>
                        </Link>
                    </span>
                    <span className="singlePostDate" >   {new Date(post.createdAt).toDateString()}</span>
                </div>
                <div className="singlepostdis" >
                    {post.description}
                </div>


            </div>

        </div>
    )
}

export default SinglePost