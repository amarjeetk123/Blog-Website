import "./RegisterPage.css"
import {Link} from "react-router-dom"

function RegisterPage() {
  return (
    <div className="register">
      <pan className="registerTitle">register</pan>
      <form className="registerFarm">
      <label>Username</label>
        <input type="email" placeholder="Enter your username...." />
        <label>Email</label>
        <input type="email" placeholder="Enter your email...." />
        <label>Password</label>
        <input type="password" placeholder="Enter your password...." />
        <button className="registe-btn">Register</button>
      </form>
      <Link to="/login" style={ { textDecoration:"none" } } >
      <button className="logi-btn">Login</button>
      </Link>
      
    </div>
  )
}

export default RegisterPage