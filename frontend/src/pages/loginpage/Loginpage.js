import { useState } from "react"
import { Link } from "react-router-dom"
import "./Loginpage.css"

const Loginpage = () => {
  const [error , setError] = useState(false)

  const handleSubmit = () => {
    error.preventDefault();

  }

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginFarm"  onSubmit={handleSubmit} >
        <label>Username</label>
        <input type="text" placeholder="Enter your username...." />
        <label>Password</label>
        <input type="password" placeholder="Enter your email...." />
        <button className="login-btn">Login</button>
      </form>
      <Link to={"/register"} style={{ textDecoration:"none" }} >
      <button className="register-btn"  type="submit" >Register</button>
      </Link>
      
    </div>
  )
}

export default Loginpage