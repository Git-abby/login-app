import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  doSignInWithEmailAndPassword,
  // doSignInWithGoogle,
  doSignOut,
} from "../../firebase/auth";
import { useAuth } from "../../contexts/authContexts";
import GoogleSignIn from "../GoogleAuth/GoogleSignIn";
// import { signOut } from "firebase/auth";

function Login() {
  const { userLoggedIn, currentUser } = useAuth();

  // console.log(useAuth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  console.info(email, password);

  // console.log(currentUser.email);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      try {
        await doSignInWithEmailAndPassword(email, password);
        navigate("/profile");
      } catch (error) {
        console.log(error.message);
        setErrorMessage(error.message);
        setIsSigningIn(false);
      }
      // await doSignInWithEmailAndPassword(email, password);
    }
  };

  const onSignOut = async () => {
    try {
      await doSignOut();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  // bg - white / 10;
  // shadow - lg;
  // backdrop - blur - none;
  // border;
  // border - white / 20;
  // rounded - lg;
  return (
    <>
      <div className="border  min-h-screen flex flex-col items-center justify-center gap-6 bg-gradient-to-r from-slate-700 to-slate-900 px-4">
        {errorMessage && (
          <div className="absolute top-3 mb-4 text-sm text-red-600">
            {errorMessage}
          </div>
        )}
        <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-blue-600 leading-loose">
          Login
        </h2>
        <form className="w-full max-w-md bg-white/5 backdrop-blur-lg border border-white/20 rounded-lg shadow-lg p-8 space-y-6">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={onSubmit}
            className="w-full py-2 text-white bg-gradient-to-r from-blue-300 via-blue-600 to-blue-700 rounded-lg transform transition-transform duration-300 hover:from-slate-900 hover:to-slate-500  ">
            Login
          </button>

          <GoogleSignIn />
          <p className="mt-4 text-white text-lg ">
            <Link to="/register" className="text-blue-300 hover:underline">
              Don't have an account? Register
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}

export default Login;
