import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, setDoc } from "firebase/firestore";

export const doCreateUserWithEmailAndPassword = async (email, password) => {
  const result = createUserWithEmailAndPassword(auth, email, password);
    console.log(result);
  return result;
};

export const doSignInWithEmailAndPassword = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);

  if (result.user) {
    await setDoc(doc(db, "users", result.user.uid), {
      displayName: result.user.displayName,
      email: result.user.email,
      photoUrl: result.user.photoURL,
    });
  }

  return result;
};

export const doSignOut = () => {
  return auth.signOut();
};
