import React from "react";
import { useAuth } from "../../contexts/authContexts";
import { doSignOut } from "../../firebase/auth";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { currentUser } = useAuth();
  console.log(currentUser);

  const navigate = useNavigate();
  const onSignout = async (e) => {
    e.preventDefault();
    try {
      await doSignOut();
      navigate("/");
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-slate-700 to-slate-900 px-4">
      {currentUser ? (
        <div className="text-center bg-white/10 p-8 rounded-lg shadow-lg backdrop-blur-md border border-white/20">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 mb-4">
            Welcome
          </h1>
          <div className="flex flex-col items-center space-y-4">
            <img
              src={currentUser.photoURL}
              alt="user"
              className="w-24 h-24 rounded-full shadow-md"
            />
            <h3 className="text-lg text-white">{currentUser.email}</h3>
          </div>
          <button
            type="button"
            onClick={onSignout}
            className="mt-6 py-2 px-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg transform transition-transform duration-300 hover:scale-105 hover:from-slate-900 hover:to-slate-500">
            Logout
          </button>
        </div>
      ) : (
        <p className="text-white text-lg">Loading...</p>
      )}
    </div>
  );
}

export default Profile;
