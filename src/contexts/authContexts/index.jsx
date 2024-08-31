import React from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { auth } from "../../firebase/firebase";
// import { doc, getDoc } from "firebase/firestore";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);
    return unsubscribe;
  }, []);

  async function initializeUser(user) {
    // setCurrentUser({...user});
    // console.log(currentUser);
      if (user) {
        // console.log(user.uid)
        setCurrentUser({ ...user });
      setUserLoggedIn(true);

      //Fetch USer from Firestore
    //   const docRef = doc(db, "users", user.uid);
    //   const docSnap = await getDoc(docRef);

    //   console.log(docSnap.data());
    //   if (docSnap.exists()) {
    //     //state set
    //     setUserLoggedIn(true);
    //     console.log(docSnap.data());
    //     setCurrentUser(docSnap.data());
    //   } else {
    //       console.info("User is not logged yet!");
    //     }
    } else {
        setCurrentUser(null);
      setUserLoggedIn(false);
    }
    setLoading(false);
  }
//   console.log(userLoggedIn);

  const value = {
    currentUser,
    userLoggedIn,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
