// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDKtSM8t2ZKlqrWrnKSluGb3Te9g_IDnsc",
  authDomain: "login-page-64d15.firebaseapp.com",
  projectId: "login-page-64d15",
  storageBucket: "login-page-64d15.appspot.com",
  messagingSenderId: "211306730001",
  appId: "1:211306730001:web:04b089cebe8ee0619297b0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {app, auth};