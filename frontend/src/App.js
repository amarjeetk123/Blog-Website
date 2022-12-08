
import './App.css';
import Single from './pages/single/Single';
// import {BrowserRouter , Router , Route , Link , Switch} from "react-router-dom"
import {BrowserRouter , Route , Routes} from "react-router-dom"


import Navbar from "./components/header/Navbar"
// import Home from "./components/pages/home/Home"
import Home from "./pages/home/Home"
import WritePage from './pages/write/WritePage';
import UserSetting from './pages/userSettings/UserSetting';
import RegisterPage from './pages/registerPage/RegisterPage';
import Loginpage from './pages/loginpage/Loginpage';
import { useState } from 'react';

function App() {
  const [user , setUser] = useState(false)
  
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='/register' element={ user ? <Home /> : <RegisterPage /> } />
        <Route path='/login' element={ user ? <Home /> : <Loginpage /> } />
        <Route path='/write' element={ user ?  <WritePage /> : <RegisterPage /> } />
        <Route path='/settings' element={ user ?  <UserSetting /> : <RegisterPage /> } />
        <Route path='/post/:postid' element={ <Single /> } />
        

      </Routes>
     
    
  
      
    </BrowserRouter>
  );
}

export default App;
