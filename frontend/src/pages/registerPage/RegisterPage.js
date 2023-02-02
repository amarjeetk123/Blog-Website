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
      // console.log(error.response.data)
      alert(error.response.data)
    }

  }

  const checkfullname = (e) => {
   let value = fullname
    const regMatch = /^[a-zA-Z]*$/.test(value);

    if (!regMatch) {
      alert("Fullname Should Contain Aplhabets Only")
    }
  }
  const checkUsername = (e) => {
    let value = username
     const regMatch = /^[a-zA-Z]*$/.test(value);
 
     if (!regMatch) {
       alert("Fullname Should Contain Aplhabets Only")
     }
   }

  return (
    <div className="register" >
      <span className="registerTitle">register</span>
      <form className="registerFarm" onSubmit={handleSubmit}>
      <label>Fullname</label>
        <input type="text" placeholder="Enter your Fullname...."
          onChange={(e) => setFullname (e.target.value)} 
           onBlur={checkfullname} />
        <label>Username</label>
        <input type="text" placeholder="Enter your username...."
          onChange={(e) => setUsername(e.target.value)} />
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