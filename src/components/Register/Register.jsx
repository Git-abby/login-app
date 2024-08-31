import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { doCreateUserWithEmailAndPassword } from "../../firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useAuth } from "../../contexts/authContexts";

function Register() {
  // const { currentUser } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  // console.log(name, email, password)

  const navigate = useNavigate();
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isRegistering) {
      setIsRegistering(true);
      try {
        const result = await doCreateUserWithEmailAndPassword(email, password);
        console.log("Result from Auth:> >", result);
        console.log("USER from Auth:> >", result.user);
        const uid = result.user.uid;
        const photoURL = result.user.photoURL;
        const userData = {
          name,
          email,
        };
        
        console.log("UID:>>", uid);
        await saveUserToFirestore(uid, photoURL, userData);
        const userRef = doc(db, "users", uid);

        navigate("/profile", { state: { uid } });
      } catch (error) {
        console.log(error.message);
        setErrorMessage(error.message);
      }
      // console.log(res);
    }
  };

  const saveUserToFirestore = async (uid, photoURL, userdata) => {
    try {
      const docRef = await setDoc(doc(db, "users", uid), {
        displayName: userdata.name,
        email: userdata.email,
        photoUrl: photoURL,
      });
      const userRef = doc(db, "users", uid);

      console.info("Doc Ref", userRef);
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-gradient-to-r from-slate-700 to-slate-900 px-4">
      {errorMessage && (
        <div className="absolute top-3 mb-4 text-sm text-red-600">
          {errorMessage}
        </div>
      )}
      <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-blue-600 leading-loose">
        Register
      </h2>
      <form className="w-full max-w-md bg-white/5 backdrop-blur-lg border border-white/20 rounded-lg shadow-lg p-8 space-y-6">
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <button
          type="button"
          onClick={onSubmit}
          className="w-full py-2 text-white bg-gradient-to-r from-blue-300 via-blue-600 to-blue-700 rounded-lg transform transition-transform duration-300 hover:from-slate-900 hover:to-slate-500">
          Register
        </button>
        <p className="mt-4 text-white text-lg">
          <Link to="/" className="text-blue-300 hover:underline">
            Already have an account? Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
