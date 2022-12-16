import "./usersetting.css"
import Sidebar from "../../components/sidebar/Sidebar"
import { useContext, useState } from "react"
import { Context } from "../../context_api/Context"
import axios from "axios"

const UserSetting = () => {
    
    const publicFolder = "http://localhost:4001/images/" ;

    const { user, dispatch } = useContext(Context)
  
    const [file, setFile] = useState(null)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [sucseesMessage , setSuccessMessage] = useState(false)



    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("1st",user)

        dispatch({ type: "UPDATE_START" });

        const updatedUser = {
            userId: user.user._id,
            email,
            password,
        }
        console.log("2nd" ,updatedUser)

        if (file) {
            const data = new FormData();
            // here i have to use a random number so that user can not upload differet images with same file,.... for this we can use current date tiem
            const filename = Date.now() + file.name
            data.append("name", filename)
            data.append("file", file)
            updatedUser.profilepicture = filename;
            try {
                const res = await axios.post("api/upload", data)
            } catch (error) {
                // console.log(error.message)
                console.log("error in first try catch in handleSubmit in writePage.js")
            }
        }

        try {
            const id = updatedUser.userId
            const res = await axios.put(`/user/update/${id}`, updatedUser)
            
            setSuccessMessage(true)
            console.log( "3rd" , res.data)

            console.log("4",user.user)
           
            dispatch({ type: "UPDATE_SUCCESS", payload: res.data.updatedUser });
            // dispatch({ type: "LOGIN_SUCCESS", payload: res.data })

            
        } catch (error) {
            dispatch({ type: "UPDATE_FAILURE" });
            console.log(error)
            console.log(error.message)
            console.log("error in second try catch in handleSubmit in writePage.js")
        }
    }

    return (
        <div className="userSetting">
            <div className="settingWrapper">
                <div className="settingTitle">
                    <span className="settingUpdateTitle">  Update Your Account   </span>
                    <span className="settingDeleteTitle">  Delete Your Accound    </span>
                </div>

                <form className="settingForm" onSubmit={handleSubmit} >
                    <label className="pplabel" >Profile Picture</label>
                    <div className="setingProfilepic">
                        {
                            user ?
                                <img className="ppimage1"
                                    src={ file ? URL.createObjectURL(file) : publicFolder + user.user.profilepicture  } 
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
                    <input type={"text"} placeholder={user.user.username} defaultValue={user.user.username} readOnly   className="setingUsernameinput" />

                    <label>Email</label>
                    <input type={"email"} placeholder={user.user.email} className="setingUseremailinput " onChange={(e) => setEmail(e.target.value)} />

                    <label>Password</label>
                    <input type={"text"} className="setingUsernameinput"  onChange={(e) => setPassword(e.target.value)} />

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