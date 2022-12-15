import "./SinglePost.css"
import { Link, useLocation } from "react-router-dom"
import { useContext, useEffect, useState } from "react"

import axios from "axios"
import { Context } from "../../context_api/Context"

const SinglePost = () => {

    const { user } = useContext(Context)
    // console.log(user.user.username) 
    const publicFolder = "http://localhost:4001/images/"



    const location = useLocation()
    // console.log(location)   console.log(location.pathname.split("/")[2]);
    const path = location.pathname.split("/")[2]

    const [post, setPost] = useState({})

    const getPost = async () => {
        const res = await axios.get("/getpost/" + path);
        // console.log(res.data.post)
        setPost(res.data.post)

        // for post update
        setTitle(res.data.post.title)
        setDescription(res.data.post.description)
    }
    const handleDelete = async () => {
        try {
            const userPermission = window.confirm("Are you want to delete this post")
            if (userPermission) {

                const id = path
                // console.log(username1) 
                const data = {
                    username: user.user.username,
                }
                const res = await axios.delete(`/post/delete/${id}`, { data })
                window.location.replace("/")
            }

        } catch (error) {
            console.log(error.message)
            console.log(error)

        }
    }
    // code for update the post
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [updateMode, setUpdateMode] = useState(false)

    const handleUpdate = async () => {
        try {
            const data = {
                username: user.user.username,
                title: title,
                description,
            }

            const id = path
            const res = await axios.put(`/post/${id}`, data)     // value comming fro user through useContext

            window.location.reload()

        } catch (error) {
            // console.log(error)
            // console.log(error.response)
            alert(error.response.data)
        }
    }


    useEffect(() => {
        getPost();

    }, [path])

    return (
        <div className="singlePost" >

            <div className="singlePosetWrapper" >

                <div className="image-div">
                    {post.photo ?
                        <img src={publicFolder + post.photo}
                            className="singlepageimage"
                        /> :
                        <img src="https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg"
                            className="singlepageimage"
                        />
                    }
                </div>

                {updateMode ? <input value={title} className="singlePostTitle-inputmode" autoFocus
                    onChange={(e) => setTitle(e.target.value)}
                /> :
                    <h1 className="singlePostTitle"> {post.title}
                        {post.username === user?.user?.username && <div className="SinglePagecon">
                            <i className="fa-regular fa-pen-to-square editIcon" onClick={(e) => setUpdateMode(true)} ></i>
                            <i className="fa-solid fa-trash deleteIcon  " onClick={handleDelete} ></i>
                        </div>}
                    </h1>}


                <div className="postInformation">
                    <span className="postAuthor" >   Author:
                        <Link to={`/?user=${post.username}`} className="link" >
                            <b>{post.username}</b>
                        </Link>
                    </span>
                    <span className="singlePostDate" > {new Date(post.createdAt).toDateString()} </span>
                </div>
                {updateMode ? <textarea autoFocus value={description} className="singlepostdis-textarea"
                    onChange={(e) => setDescription(e.target.value)} /> :
                    <div className="singlepostdis" >
                        {post.description}
                    </div>}
                {/* the belove button is visible at the time of content updating  */}
               { updateMode &&  <div className="up-btn-div">
                    <button type="submit" className="update-btn" onClick={handleUpdate} >Update Post</button>
                </div> }

            </div>


        </div>
    )
}

export default SinglePost