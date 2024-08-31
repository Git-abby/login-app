import React, { useState } from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";


import './App.css';
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Profile from "./components/Profile/Profile";
import { doSignInWithGoogle } from "./firebase/auth";


function App() {

  const [userInfo, setUserInfo] = useState(null);
  const [isSigningIn, setIsSigningIn] = useState(false);
  // const navigate = useNavigate();
  
  
  const onGoogleSubmit = async (e) => {
    e.preventDefault();

    if (!isSigningIn) {
      setIsSigningIn(true);
      try {
        const result = await doSignInWithGoogle();
        console.log(result);
        setUserInfo(result.user);
        // navigate('/profile');
        console.info("userInfo :>>", userInfo);
      } catch (error) {
        console.error(error.message);
        setIsSigningIn(false);
      }
    }

  }
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login onGoogleSubmit={onGoogleSubmit}/>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
