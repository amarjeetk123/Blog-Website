import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./home.css";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import { SERVER_URL } from "../../App";

const Home = ({ setRemoveBox, searchInput }) => {

  const [posts, setPosts] = useState([]);
  let { search } = useLocation();

  if (searchInput !== "" && !search) {
    search = `/?search=${searchInput}`;
  }

  // Use useCallback to avoid unnecessary re-creation
  const fetchPost = useCallback(async () => {
    console.log("yes"); // ✅ Will now log only when `search` actually changes
    try {
      const res = await axios.get(`${SERVER_URL}/getallpost` + search);
      setPosts(res.data.posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }, [search]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  return (
    <>
      <Header />
      <div className="home" onClick={() => setRemoveBox(true)}>
        <div className="con">
          <Sidebar />
          <Posts posts={posts} />
        </div>
      </div>
    </>
  );
};

export default Home;
