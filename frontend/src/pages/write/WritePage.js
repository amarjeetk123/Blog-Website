import axios from "axios";
import { useContext, useEffect, useState } from "react";
import "./WritePage.css";
import { Context } from "../../context_api/Context";
import { SERVER_URL } from "../../App";
import RichTextEditor from "./RichText";

const WritePage = () => {

    /* ================= STATE ================= */
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState(null);

    /* Logged-in user from Context */
    const { user } = useContext(Context);

    /* ================= AUTH GUARD ================= */
    useEffect(() => {
        if (!user) {
            window.location.replace("/login");
        }
    }, [user]);

    /* ================= FORM SUBMIT ================= */
    const handleSubmit = async (e) => {
        e.preventDefault();

        /* Basic validation */
        if (!title || !description) {
            alert("Title and content are required");
            return;
        }

        /* Post object (image URL will be added later) */
        const newPost = {
            username: user.user.username,
            title,
            description,
        };

        /* ================= IMAGE UPLOAD ================= */
        if (file) {
            try {
                /*
                 * FormData is required because:
                 * - Images are binary data
                 * - Normal JSON cannot send files
                 */
                const data = new FormData();

                /*
                 * "file" key MUST match:
                 * upload.single("file") in backend
                 */
                data.append("file", file);

                /*
                 * Send image to backend
                 * Backend uploads it to Cloudinary
                 * Cloudinary returns a public image URL
                 */
                const uploadRes = await axios.post(
                    `${SERVER_URL}/api/upload`,
                    data
                );

                /*
                 * Save Cloudinary image URL in post
                 * This is what you store in DB
                 */
                newPost.photo = uploadRes.data.imageUrl;

            } catch (error) {
                console.error("Image upload failed", error);
                alert("Image upload failed");
                return;
            }
        }

        /* ================= CREATE POST ================= */
        try {
            const res = await axios.post(
                `${SERVER_URL}/post`,
                newPost
            );

            /* Redirect to newly created post */
            window.location.replace("/post/" + res.data.savePost._id);

        } catch (error) {
            console.error("Post creation failed", error);
        }
    };

    /* ================= UI ================= */
    return (
        <div className="write">

            {/* IMAGE PREVIEW BEFORE UPLOAD */}
            <div className="image-div">
                {file && (
                    <img
                        className="writeImage"
                        src={URL.createObjectURL(file)}
                        alt="preview"
                    />
                )}
            </div>

            {/* FORM */}
            <form className="writeform" onSubmit={handleSubmit}>

                {/* IMAGE INPUT */}
                <div className="abcd">
                    <label htmlFor="fileInput" className="add-cover">
                        <i className="fas fa-plus writeIcon"></i>
                        <h3>Add Cover</h3>
                    </label>

                    {/* 
                      accept="image/*" 
                      ensures only images can be selected
                    */}
                    <input
                        type="file"
                        id="fileInput"
                        className="fileinputwe"
                        accept="image/*"
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                </div>

                {/* TITLE & CONTENT */}
                <div className="writefromGroup">
                    <input
                        type="text"
                        placeholder="Add Title..."
                        className="writeTitle"
                        autoFocus
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    {/* Rich text editor */}
                    <div className="textEditor">
                        <RichTextEditor setDescription={setDescription} />
                    </div>
                </div>

                {/* SUBMIT BUTTON */}
                <button className="writebtn" type="submit">
                    Publish
                </button>

            </form>
        </div>
    );
};

export default WritePage;
