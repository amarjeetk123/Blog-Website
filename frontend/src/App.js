import './App.css';
import Single from './pages/single/Single';

import { BrowserRouter, Route, Routes } from "react-router-dom"

import Navbar from "./components/header/Navbar"
// import Home from "./components/pages/home/Home"
import Home from "./pages/home/Home"
import WritePage from './pages/write/WritePage';
import UserSetting from './pages/userSettings/UserSetting';
import RegisterPage from './pages/registerPage/RegisterPage';
import Loginpage from './pages/loginpage/Loginpage';
import { useContext, useState, useEffect } from 'react';
import { Context } from './context_api/Context';
import Post from "./components/post/Post"
import GridLoader from "react-spinners/GridLoader";
export const SERVER_URL = process.env.REACT_APP_SERVER_URL;



function App() {
  const [spinner, setSpinner] = useState(false)

  useEffect(() => {
    setSpinner(true)
    setTimeout(() => {
      setSpinner(false)
    }, 2000);

  }, [])


  const { user } = useContext(Context)
  return (
    <div>
      {
        spinner ?
          <div className='loading-animation'>
            <GridLoader />
          </div>
          :
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/register' element={user ? <Home /> : <RegisterPage />} />
              <Route path='/login' element={user ? <Home /> : <Loginpage />} />
              <Route path='/write' element={user ? <WritePage /> : <Loginpage />} />
              <Route path='/settings' element={user ? <UserSetting /> : <RegisterPage />} />
              <Route path='/post/:postid' element={<Single />} />
              <Route path='/special/:postid' element={<Post />} />
            </Routes>
          </BrowserRouter>
      }
    </div>
  );
}

export default App;
