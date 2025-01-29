import "./home.css"
import Header from "../../components/header/Header"
import Posts from "../../components/posts/Posts"
import Sidebar from "../../components/sidebar/Sidebar"
import { useEffect, useState } from "react"
import axios from "axios"
import { useLocation } from "react-router-dom"

import { SERVER_URL } from "../../App"


const Home = ({ setRemoveBox, searchInput }) => {

  const location = useLocation();
  const hideHeaderPaths = ["/login", "/register", "/admin"];

  const [posts, setPosts] = useState([])

  let { search } = useLocation()

  if (searchInput !== "" && !search) {
    search = `/?search=${searchInput}`
    console.log(search)

  }

  const fetchPost = async () => {
    // const res = await  axios.get("/getallpost" + search )
    const res = await axios.get(`${SERVER_URL}/getallpost` + search)
    //  console.log(res.data)
    //  console.log(res.data.success)

    setPosts(res.data.posts)
  }

  useEffect(() => {
    fetchPost();
  }, [search])
  return (
    <>
      {!hideHeaderPaths.includes(location.pathname) && <Header />}
      <div className="home" onClick={() => setRemoveBox(true)}  >
        <div className="con">
          <Sidebar />
          <Posts posts={posts} />
        </div>
      </div>
    </>

  )
}

export default Home