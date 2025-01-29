import "./RegisterPage.css"
import { Link } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import { SERVER_URL } from "../../App"

function RegisterPage() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullname, setFullname] = useState("")

  const validateFullname = () => {
    let value = fullname;
    const regMatch = /^[a-z A-Z]*$/.test(value);
    if (!regMatch) {
      alert("Fullname Should Contain Aplhabets Only");
      setFullname("")
    }
  }
  const validateUsername = () => {
    let value = username
    const regMatch = /[0-9A-F:]+/g.test(value);
    if (!regMatch) {
      alert("Username Should Contain AplhaNumric value");
      setUsername("")
    }
    // console.log(typeof username[0] )
    //   if(typeof username[0] === "number"){

    //  return alert("Username Should be Start from Alphabets")
    //   }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${SERVER_URL}/register`, {
        fullname,
        username,
        email,
        password
      })
      // console.log(res.data.message)

      res.data && window.location.replace("/login")

    } catch (error) {
      alert(error.response.data)
    }


  }



  return (
    <div className="register" >
      <span className="registerTitle">register</span>
      <form className="registerFarm" onSubmit={handleSubmit}>
        <label>Fullname</label>
        <input value={fullname} type="text" placeholder="Enter your Fullname...."
          onChange={(e) => setFullname(e.target.value)}
          onBlur={validateFullname} />
        <label>Username</label>
        <input value={username} type="text" placeholder="Enter your username...."
          onChange={(e) => setUsername(e.target.value)} 
          onBlur={validateUsername} />
        <label>Email</label>
        <input type="email" placeholder="Enter your email...."
          onChange={(e) => setEmail(e.target.value)} />
        <label>Password</label>
        <input type="password" placeholder="Enter your password...."
          onChange={(e) => setPassword(e.target.value)} />
        <button className="registe-btn">Register</button>
      </form>
      <Link to="/login" style={{ textDecoration: "none" }} >
        <button className="logi-btn">Login</button>
      </Link>

    </div>
  )
}

export default RegisterPage