import "./SinglePost.css"
import { Link, useLocation } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import RichTextEditor from "../../pages/write/RichText"
import axios from "axios"
import { Context } from "../../context_api/Context"
import { SERVER_URL } from "../../App"
import parse from "html-react-parser";

const SinglePost = () => {
    const { user } = useContext(Context)
    const publicFolder = `${SERVER_URL}/images/`

    const location = useLocation()
    // console.log(location)   console.log(location.pathname.split("/")[2]);
    const path = location.pathname.split("/")[2]

    const [post, setPost] = useState({})


    const handleDelete = async () => {
        try {
            const userPermission = window.confirm("Are you want to delete this post")
            if (userPermission) {
                const id = path
                const data = {
                    username: user.user.username,
                }
                await axios.delete(`${SERVER_URL}/post/delete/${id}`, { data })
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
            await axios.put(`${SERVER_URL}/post/${id}`, data)     // value comming fro user through useContext
            // window.location.reload()
            setUpdateMode(false)

        } catch (error) {
            console.log(error, "error in hande update")
            // console.log(error.response)
            alert(error.response.data, "error in hande update")
        }
    }

    useEffect(() => {
        const getPost = async () => {
            const res = await axios.get(`${SERVER_URL}/getpost/` + path);
            // console.log(res.data.post)
            setPost(res.data.post)
            // for post update
            setTitle(res.data.post.title)
            setDescription(res.data.post.description)
        }
        getPost();
    }, [path])

    return (
        <div className="singlePost" >

            <div className="singlePosetWrapper" >

                <div className="image-div">
                    {post.photo ?
                        <img src={publicFolder + post.photo}
                            className="singlepageimage"
                            alt="post-image" /> :
                        <img src="https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg"
                            className="singlepageimage"
                            alt="post-image" />
                    }
                </div>

                {updateMode ? <input value={title} className="singlePostTitle-inputmode" autoFocus
                    onChange={(e) => setTitle(e.target.value)}
                /> :
                    <h1 className="singlePostTitle"> {title}
                        {post.username === user?.user?.username && <div className="SinglePagecon">
                            <i className="fa-regular fa-pen-to-square editIcon" onClick={(e) => setUpdateMode(true)} ></i>
                            <i className="fa-solid fa-trash deleteIcon  " onClick={handleDelete} ></i>
                        </div>}
                    </h1>}

                <div className="postInformation">
                    <p className="postAuthor">Author :
                        <Link to={`/?user=${post.username}`} className="link" >
                            <p className="username"> {post.username}</p>
                        </Link>
                    </p>
                    <p className="singlePostDate" > {new Date(post.createdAt).toDateString()} </p>
                </div>
                {updateMode ? <RichTextEditor
                    setDescription={setDescription}
                    value={description}
                    className="singlepostdis-textarea"
                /> :
                    <div className="singlepostdis" >
                        {parse(description)}
                    </div>}
                {/* the belove button is visible at the time of content updating  */}
                {updateMode && <div className="up-btn-div">
                    <button type="submit" className="update-btn" onClick={handleUpdate} >Update Post</button>
                </div>}
            </div>
        </div>
    )
}

export default SinglePost