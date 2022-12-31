import axios from "axios"
import { useContext, useState } from "react"
import "./WritePage.css"
import { Context } from "../../context_api/Context"
import { SERVER_URL } from "../../App"
import RichTextEditor from "./RichText"

const WritePage = () => {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [file, setFile] = useState(null)
    const { user } = useContext(Context)

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newPost = {
            username: user.user.username,
            title,
            description,
        }
        if (file) {
            const data = new FormData();
            // here i have to use a random number so that user can not upload differet images with same file,.... for this we can use current date tiem
            const filename = Date.now() + file.name
            data.append("name", filename)
            data.append("file", file)
            newPost.photo = filename;
            try {
                // const res = await axios.post("api/upload", data)
                const res = await axios.post(`${SERVER_URL}/api/upload`, data)
            } catch (error) {
                // console.log(error.message)
                // console.log("error in first try catch in handleSubmit in writePage.js")
            }
        }

        try {
            const res = await axios.post(`${SERVER_URL}/post`, newPost)
            window.location.replace("/post/" + res.data.savePost._id)
            // console.log(res.data.savePost._id)
        } catch (error) {
            // console.log(error)
            // console.log(error.message)
            // console.log("error in second try catch in handleSubmit in writePage.js")
        }
    }
// the below object is for textEditor
   

    return (
        <div className="write" >
            <div className="image-div">
                {file && <img className="writeImage"
                    src={URL.createObjectURL(file)}
                />}
            </div>
            <form className="writeform"  >
                <div className="abcd" >
                    <label htmlFor="fileInput" className="add-cover" >
                        <i className="fas fa-plus writeIcon"></i>
                        <h3>Add Cover</h3>
                    </label>
                    <input type="file" id="fileInput" className="fileinputwe" onChange={(e) => setFile(e.target.files[0])} />
                </div>
                <div className="writefromGroup">
                    <input type={"text"} placeholder="Add Title..." className="writeTitle" autoFocus={true}
                        onChange={(e) => setTitle(e.target.value)} />
                    {/* <textarea placeholder="Write About Your Story....." className="writeTectArea writeTitle"
                    onChange={(e) => setDescription(e.target.value)  } ></textarea> */}
                    <div className="textEditor">
                        <RichTextEditor  setDescription={setDescription} />
                    </div>
                    <div>{description}</div>


                </div>
                <button className="writebtn" type="submit" onClick={handleSubmit} >
                    Publish
                </button>
            </form>

        </div>
    )
}

export default WritePage