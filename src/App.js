import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import './App.css';
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Profile from "./components/Profile/Profile";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
