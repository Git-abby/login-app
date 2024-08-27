import React, { useState } from "react";
import { Link } from "react-router-dom";
import { doCreateUserWithEmailAndPassword } from "../../firebase/auth";

function Register() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 const [isRegistering, setIsRegistering] = useState(false);
 const [errorMessage, setErrorMessage] = useState('');
  // console.log(name, email, password)

  const onSubmit = async (e) =>{
    e.preventDefault();
    if(!isRegistering){
      setIsRegistering(true);
      await doCreateUserWithEmailAndPassword(email, password);
      // console.log(res);
    }
  }
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold text-gray-700 mb-6">Register</h2>
      <form className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
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
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <button
          type="button"
          onClick={onSubmit}
          className="bg-blue-600 text-white w-full py-2 rounded-lg hover:bg-blue-500 transition duration-300">
          Register
        </button>
      </form>
      <p className="mt-4">
        <Link to="/" className="text-blue-600 hover:underline">
          Already have an account?
        </Link>
      </p>
    </div>
  );
}

export default Register;
