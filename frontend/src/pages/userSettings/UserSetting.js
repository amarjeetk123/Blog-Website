import "./usersetting.css"
import Sidebar from "../../components/sidebar/Sidebar"
import { useContext, useState } from "react"
import { Context } from "../../context_api/Context"
import axios from "axios"

import { SERVER_URL } from "../../App"

const UserSetting = () => {
    const publicFolder = `${SERVER_URL}/images/`

    const { user, dispatch } = useContext(Context)
    console.log("user" , user)

    const [file, setFile] = useState(null)
    console.log( "file" ,file)
    // console.log( "file" ,user.user.profilepicture)
  
    const [email, setEmail] = useState("")
    // console.log(email)
    const [password, setPassword] = useState("")

    const [sucseesMessage, setSuccessMessage] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();

        dispatch({ type: "UPDATE_START" });

        const User = {
            userId: user.user._id,
            email,
            password,
        }

        if (file) {
            const data = new FormData();
            // here i have to use a random number so that user can not upload differet images with same file,.... for this we can use current date tiem
            const filename = Date.now() + file.name
            data.append("name", filename)
            data.append("file", file)
            User.profilepicture = filename;
            try {
                // const res = await axios.post("api/upload", data)
                const res = await axios.post(`${SERVER_URL}/api/upload`, data)
            } catch (error) {
                console.log(error)
                 console.log("error in first try catch in handleSubmit in writePage.js")
            }
        }

        try {
            const id = User.userId
            // const res = await axios.put(`/user/update/${id}`, User)
            const res = await axios.put(`${SERVER_URL}/user/update/${id}`, User)

            setSuccessMessage(true)

            dispatch({ type: "UPDATE_SUCCESS", payload: res.data });

            console.log(res)
            window.location.reload()

        } catch (error) {
            dispatch({ type: "UPDATE_FAILURE" });
            console.log(error.message)
            
        }
    }
    console.log( "file" ,user.user.profilepicture)


    const handleDelete = async (e) => {
        e.preventDefault();

        const userChoice = window.confirm("Are you sure...?")

        if (userChoice) {
            try {
                const id = user.user._id
                const data = {
                    userId: user.user._id,
                }

                const res = await axios.delete(`${SERVER_URL}/user/delete/${id}`, { data })
            //    console.log( "del" , res)
                dispatch({ type: "LOGOUT" });
                window.location.replace("/register")
            } catch (error) {

                // console.log(  "del" , error.message)
            }

        }

    }

    return (
        <div className="userSetting">
            <div className="settingWrapper">
                <div className="settingTitle">

                    <button className="settingDeleteTitle" onClick={handleDelete}>Delete Your Accound </button>

                </div>

                <form className="settingForm" onSubmit={handleSubmit} >
                    <label className="pplabel" >Profile Picture</label>
                    <div className="setingProfilepic">
                        {
                            user.user.profilepicture ?
                                <img className="ppimage1"
                                    src={ publicFolder + user.user.profilepicture}
                                    alt="userImage"
                                /> :
                                <img className="ppimage2"
                                    src="https://cdn.onlinewebfonts.com/svg/img_24073.png"
                                    alt="userImage"
                                />
                        }
                        <label htmlFor="fileInput" className="same1" >
                            <img className="setingProfilepicIcon" src="https://vssmn.org/wp-content/uploads/2018/12/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png" alt="image-btn" />
                        </label>
                        <input type={"file"} className="hide" id="fileInput"
                            onChange={(e) => setFile(e.target.files[0])} />
                    </div>

                    <label>Username</label>
                    <input type={"text"} placeholder={user.user.username} defaultValue={user.user.username} readOnly className="setingUsernameinput" />

                    <label>Email</label>
                    <input type={"email"} placeholder={email} defaultValue={email}  className="setingUseremailinput " onChange={(e) => setEmail(e.target.value)} />

                    <label>Password</label>
                    <input type={"password"} className="setingUsernameinput" placeholder={user.user.password} onChange={(e) => setPassword(e.target.value)} />

                    <button className="settingUpdatebtn " type="submit"> Update</button>

                    {
                        sucseesMessage &&
                        <div className="msg-box">
                            <h1>Your Information is Succesfull Updated</h1>
                        </div>
                    }


                </form>

            </div>

            <Sidebar />

        </div>
    )
}

export default UserSetting