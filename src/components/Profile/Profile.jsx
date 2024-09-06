import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/authContexts";
import { doSignOut } from "../../firebase/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { doc, getDoc} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import Lottie from "lottie-react";
import animationData from "../../animations/Animation - 1725206661640.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Profile() {
//   const query = new URLSearchParams(window.location.search);
//   const myParam = query.get("success");
  const [userInfo, setUserInfo] = useState(null);

  const { currentUser } = useAuth();
  const location = useLocation();
  const uid = location.state?.uid;
  const navigate = useNavigate();

    // Check for the success query param and show the toast
    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        const myParam = query.get("success");
    
        if (myParam === "true") {
          toast.success("Login Successfull", { position: "top-center" });
        }
      }, []);

  const style = {
    height: "90%",
    borderRadius: "50%",
    background: "white",
  };
  //   if(userLoggedIn){
  //     toast.success("Successfully Logged in!", {position: "top-center"});
  //   }
  //   if(userInfo){
  //     toast("user");
  //   }
  useEffect(() => {
    if (!userInfo && uid) {
      const fetchUser = async () => {
        // toast("Login Success", { position: "top-center" });
        if (uid) {
          const userRef = doc(db, "users", uid);
          const docSnap = await getDoc(userRef);
          if (docSnap.exists()) {
            setUserInfo(docSnap.data());
          } else {
            console.error("No such user");
          }
        }
      };
      fetchUser();
    }
  }, [uid, userInfo]);

  const onSignout = async (e) => {
    e.preventDefault();
    try {
      await doSignOut();
      navigate("/");
    } catch (error) {
      console.error(error.message);
    }
  };

  if (!userInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-800 to-gray-900">
        <p className="text-white text-lg">Loading user data...</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-gray-800 to-gray-900 px-4">
      {currentUser ? (
        <div className="text-center bg-white/10 p-10 rounded-lg shadow-lg backdrop-blur-md border border-white/20 w-full max-w-sm">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 mb-6">
            Welcome, {userInfo.displayName.toUpperCase()}
          </h1>
          <div className="flex flex-col items-center space-y-3">
            {userInfo.photoUrl ? (
                <img
                src={userInfo.photoUrl}
                alt="user"
                className="w-28 h-28 rounded-full shadow-lg border-4 border-white"
                />
            ) : (
                <div className="relative w-32 h-32 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex flex-col items-center justify-center text-gray-300 text-3xl">
                <Lottie animationData={animationData} style={style} />
                {/* <span className="absolute bottom-2 text-black">{userInfo.displayName.charAt(0).toUpperCase()}</span> */}
              </div>
            )}
            <h3 className="text-2xl text-gray-100 font-mono">
              {userInfo.email}
            </h3>
          </div>
          <ToastContainer />
          <button
            type="button"
            onClick={onSignout}
            className="mt-8 py-3 px-6 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg transform transition-transform duration-300 hover:scale-105 hover:from-blue-600 hover:to-blue-800 shadow-lg">
            Logout
          </button>
          {/* <button onClick={notify}>Notify !</button> */}
        </div>
      ) : (
        <p className="text-white text-lg">Loading...</p>
      )}
    </div>
  );
}

export default Profile;
