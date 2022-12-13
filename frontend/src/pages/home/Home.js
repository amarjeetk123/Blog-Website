import "./home.css"
import Header from "../../components/header/Header"
import Posts from "../../components/posts/Posts"
import Sidebar from "../../components/sidebar/Sidebar"

import {useEffect, useState} from "react"

import axios from "axios"
import { useLocation } from "react-router-dom"

const Home = () => {
  const [posts , setPosts] = useState([])

  const {search} = useLocation()
//  console.log(search)

  const fetchPost = async () => {
      const res = await  axios.get("/getallpost" + search )
      //  console.log(res.data)
      //  console.log(res.data.success)
      // console.log(res.data.posts[0].title)
    
      setPosts(res.data.posts)
  }


  useEffect( () => {
    fetchPost();
  },[search] )
  return (
    <>
    <Header />
    <div className="home" >
    <Posts  posts={posts} />
    <Sidebar />
    </div>
    </>
    
  )
}

export default Home