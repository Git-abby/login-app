import React, { useState } from "react";
import { Link } from "react-router-dom";

import {
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
} from "../../firebase/auth";
import { useAuth } from "../../contexts/authContexts";

function Login() {
  const { userLoggedIn } = useAuth();

  // console.log(useAuth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  console.info(email, password);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      try {
        await doSignInWithEmailAndPassword(email, password);
      } catch (error) {
        console.log(error.message)
        setErrorMessage(error.message);
        setIsSigningIn(false);
      }
      // await doSignInWithEmailAndPassword(email, password);
    }
  };
  const onGoogleSUbmit = (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      doSignInWithGoogle().catch((err) => {
        setIsSigningIn(false);
      });
    }
  };
  return (
    <>
      {userLoggedIn && (
        <div>
          <h1>Welcome, User!</h1>
          <p>You are now logged in.</p>
        </div>
      )}
      {errorMessage && (
        <div className="mb-4 text-red-600 text-sm">{errorMessage}</div>
      )}
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-700 mb-6">Login</h2>
        <form className="bg-white p-6 rounded shadow-md w-full max-w-sm">
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="button"
            onClick={onSubmit}
            className="bg-blue-600 text-white w-full py-2 rounded-lg hover:bg-blue-500 transition duration-300">
            Login
          </button>
        </form>
        <p className="mt-4">
          <Link to="/register" className="text-blue-600 hover:underline">
            Don't have an account? Register
          </Link>
        </p>
      </div>
    </>
  );
}

export default Login;
