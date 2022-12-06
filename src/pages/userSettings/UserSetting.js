import "./usersetting.css"
import Sidebar from "../../components/sidebar/Sidebar"

const UserSetting = () => {
    return (
        <div className="userSetting">
            <div className="settingWrapper">
                <div className="settingTitle">
                    <span className="settingUpdateTitle">  Update Your Account        </span>
                    <span className="settingDeleteTitle">  Delete Your Accound        </span>
                </div>

                <form className="settingForm" >
                    <label className="pplabel" >Profile Picture</label>
                    <div className="setingProfilepic">
                        <img className="ppimage"
                            src="https://th.bing.com/th/id/R.0c16da53e571400e98f17f301bbd5095?rik=sfG96qwgK%2bCnrA&riu=http%3a%2f%2fthewowstyle.com%2fwp-content%2fuploads%2f2015%2f01%2f3d-abstract_widewallpaper_nature-frame_47491.jpg&ehk=sFkfjuAQ1aL9MnmnIGgrISKaM1F52frOH51KKgb51D0%3d&risl=&pid=ImgRaw&r=0"
                            alt="userImage"
                        />
                        <label htmlFor="fileInput" className="same1" >
                            <i class="fa-regular fa-user setingProfilepicIcon"></i>
                        </label>
                        <input type={"file"} className="hide" id="fileInput" />
                    </div>
                    <label>Username</label>
                    <input type={"text"} placeholder="Enter a username" className="setingUsernameinput" />
                    <label>Email</label>
                    <input type={"email"} placeholder="ab@gmail.com" className="setingUseremailinput " />
                    <label>Password</label>
                    <input type={"text"} className="setingUsernameinput" />

                    <button className="settingUpdatebtn">Update</button>

                </form>

            </div>

            <Sidebar />

        </div>
    )
}

export default UserSetting