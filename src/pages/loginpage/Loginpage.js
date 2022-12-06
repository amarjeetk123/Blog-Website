import { Link } from "react-router-dom"
import "./Loginpage.css"

const Loginpage = () => {
  return (
    <div className="login">
      <pan className="loginTitle">Login</pan>
      <form className="loginFarm">
        <label>Email</label>
        <input type="email" placeholder="Enter your email...." />
        <label>Password</label>
        <input type="password" placeholder="Enter your email...." />
        <button className="login-btn">Login</button>
      </form>
      <Link to={"/register"} style={{ textDecoration:"none" }} >
      <button className="register-btn">Register</button>
      </Link>
      
    </div>
  )
}

export default Loginpage