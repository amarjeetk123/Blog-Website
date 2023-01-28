import "./home.css"
import Header from "../../components/header/Header"
import Posts from "../../components/posts/Posts"
import Sidebar from "../../components/sidebar/Sidebar"
import { useEffect, useState } from "react"
import axios from "axios"
import { useLocation } from "react-router-dom"

import { SERVER_URL } from "../../App"


const Home = ({ setRemoveBox, searchInput }) => {
  const [posts, setPosts] = useState([])
  // console.log(SERVER_URL)

  let { search } = useLocation()
  //  console.log(search)
  if (searchInput !== "") {
    // console.log(searchInput)
    search = `/?search=${searchInput}`
    console.log(search)
  }

  const fetchPost = async () => {
    // const res = await  axios.get("/getallpost" + search )
    const res = await axios.get(`${SERVER_URL}/getallpost` + search)
    //  console.log(res.data)
    //  console.log(res.data.success)
    // console.log(res.data.posts[0].title)

    setPosts(res.data.posts)
  }



  useEffect(() => {
    fetchPost();
  }, [search])
  return (
    <>
      <Header />
      <div className="home" onClick={() => setRemoveBox(true)}  >
        <Sidebar />
        <Posts posts={posts} />
      </div>
    </>

  )
}

export default Home