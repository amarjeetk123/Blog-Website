import "./App.css";
import Single from "./pages/single/Single";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/header/Navbar";
import Home from "./pages/home/Home";
import WritePage from "./pages/write/WritePage";
import UserSetting from "./pages/userSettings/UserSetting";
import RegisterPage from "./pages/registerPage/RegisterPage";
import Loginpage from "./pages/loginpage/Loginpage";
import { useContext, useState, useEffect } from "react";
import { Context } from "./context_api/Context";
import GridLoader from "react-spinners/GridLoader";

export const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function App() {
  const [spinner, setSpinner] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [removebox, setRemoveBox] = useState(false);
  const { user } = useContext(Context);

  useEffect(() => {
    setSpinner(true);
    setTimeout(() => {
      setSpinner(false);
    }, 2000);
  }, []);

  return (
    <div>
      {spinner ? (
        <div className="loading-animation">
          <GridLoader />
        </div>
      ) : (
        <BrowserRouter>
          <MainContent
            setRemoveBox={setRemoveBox}
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            removebox={removebox}
            user={user}
          />
        </BrowserRouter>
      )}
    </div>
  );
}

// ✅ Move `useLocation()` inside a separate component that is inside `<BrowserRouter>`
function MainContent({ setRemoveBox, searchInput, setSearchInput, removebox, user }) {
  const location = useLocation();
  const hideHeaderPaths = ["/login","/register"];

  return (
    <>
      {/* Hide Navbar for certain paths */}
      {!hideHeaderPaths.includes(location.pathname) && (
        <Navbar setRemoveBox={setRemoveBox} setSearchInput={setSearchInput} searchInput={searchInput} removebox={removebox} />
      )}

      <Routes>
        <Route path="/" element={<Home setRemoveBox={setRemoveBox} searchInput={searchInput} />} />
        <Route path="/register" element={user ? <Home /> : <RegisterPage />} />
        <Route path="/login" element={user ? <Home /> : <Loginpage />} />
        <Route path="/write" element={user ? <WritePage /> : <Loginpage />} />
        <Route path="/settings" element={user ? <UserSetting /> : <RegisterPage />} />
        <Route path="/post/:postid" element={<Single />} />
      </Routes>
    </>
  );
}

export default App;
