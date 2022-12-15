import axios from "axios"
import { useContext, useState } from "react"
import "./WritePage.css"
import { Context } from "../../context_api/Context"

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
                const res = await axios.post("api/upload", data)
            } catch (error) {
                // console.log(error.message)
                console.log("error in first try catch in handleSubmit in writePage.js")
            }
        }

        try {
            const res = await axios.post("/post", newPost)
            window.location.replace("/post/" + res.data.savePost._id)
            // console.log(res.data.savePost._id)
        } catch (error) {
            console.log(error)
            console.log(error.message)
            console.log("error in second try catch in handleSubmit in writePage.js")
        }


    }

    return (
        <div className="write" >
            <div className="image-div">
                {file && <img className="writeImage"
                    src={URL.createObjectURL(file)}
                />}
            </div>
            <form className="writeform"  >
                <div className="abcd" >
                    <label htmlFor="fileInput" >
                        <i className="fas fa-plus writeIcon"> </i>
                    </label>
                    <input type="file" id="fileInput" className="fileinputwe" onChange={(e) => setFile(e.target.files[0])} />
                    <input type={"text"} placeholder="Title" className="writeTitle" autoFocus={true}
                     onChange={(e) => setTitle(e.target.value)  } />
                </div>
                <div className="writefromGroup">
                    <textarea placeholder="Write About Your Story....." className="writeTectArea writeTitle"
                    onChange={(e) => setDescription(e.target.value)  } ></textarea>

                </div>
                <button className="writebtn" type="submit" onClick={handleSubmit} >
                    Publish
                </button>
            </form>

        </div>
    )
}

export default WritePage