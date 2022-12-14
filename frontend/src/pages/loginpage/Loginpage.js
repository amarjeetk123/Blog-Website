import axios from "axios"
import { useContext, useRef, useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Context } from "../../context_api/Context"
import "./Loginpage.css"

const Loginpage = () => {
  const [usernameerror, setUsernameerror] = useState(false)
  const [passworderror, setPassworderror] = useState(false)

  const [password, setPassword] = useState("");
  const [username, steUsername] = useState("")

  const { user, dispatch, isFetching } = useContext(Context)

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch({ type: "LOGIN_START" })

    try {
      const res = await axios.post("/login", {
        username,
        password,
      })
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data })
      console.log(res)
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE" })
      console.log(error.response.data)
      if (error.response.data === "Wrong username") {
        setUsernameerror(true)
      }
      if (error.response.data === "Wrong Password") {
        setPassworderror(true)
      }
    }
  }
 

  useEffect(() => {
    setUsernameerror(false)
  }, [])

  // console.log(user)
  // console.log(isFetching)
  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginFarm" onSubmit={handleSubmit} >

        <label>Username</label>
        <input type="text" placeholder="Enter your username...." onChange={(e) => (
          steUsername(e.target.value),
          setUsernameerror(false)
        )
        } />
        {usernameerror && <h4 className="warning1 same3" >Wrong Username</h4>}
        <label>Password</label>
        <input type="password" placeholder="Enter your password...."
          onChange={(e) => (
            setPassword(e.target.value),
            setPassworderror(false)
          )} />
        {passworderror && <h4 className="warning2 same3" >Wrong Password</h4>}
        <button className="login-btn" disabled={isFetching}>Login</button>
      </form>
      <Link to={"/register"} style={{ textDecoration: "none" }} >
        <button className="register-btn" type="submit"  >Register</button>
      </Link>
    </div>
  )
}

export default Loginpage