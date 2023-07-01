import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const app = () => {
  if (getApps().length === 0) {
    return initializeApp({
      apiKey: "AIzaSyA9N_8DZNynJg7k9GhMzsDJPzPgFkByRgc",
      authDomain: "linkedin-scrapper-38341.firebaseapp.com",
      projectId: "linkedin-scrapper-38341",
      storageBucket: "linkedin-scrapper-38341.appspot.com",
      messagingSenderId: "759247881103",
      appId: "1:759247881103:web:d524993bdfb1bc5c81c1fa",
      measurementId: "G-K30RK7RRJ5",
    });
  } else {
    getApp();
  }
};

app();

const firestore = getFirestore();
const auth = getAuth();
const logOut = async () => await signOut(auth);

const userSignedIn = () => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) return true;
  return false;
};

export { firestore, auth, logOut, userSignedIn };

export default app;
