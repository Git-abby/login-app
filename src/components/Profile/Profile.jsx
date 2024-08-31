import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/authContexts";
import { doSignOut } from "../../firebase/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

function Profile() {
  const [userInfo, setUserInfo] = useState(null);
  const { currentUser } = useAuth();
  const location = useLocation();

  const uid = location.state?.uid;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      if (uid) {
        const userRef = doc(db, "users", uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          setUserInfo(docSnap.data());
          console.log("USER", userInfo.displayName);
        } else {
          console.error("No such user");
        }
      }
    };
    fetchUser();
  }, [uid]);

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
            Welcome, Successfully logged in
          </h1>
          <div className="flex flex-col items-center space-y-4">
            {userInfo.photoURL && (
              <img
                src={userInfo.photoURL}
                alt="user"
                className="w-24 h-24 rounded-full shadow-md"
              />
            )}
            {userInfo.displayName && (
              <h2 className="text-xl text-white">{userInfo.displayName}</h2>
            )}
            <h3 className="text-lg text-white">{userInfo.email}</h3>
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
