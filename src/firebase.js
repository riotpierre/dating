import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDChQInkHMZO4qRpOrdSKZsn6RRCSTSy0U",
  authDomain: "annkoutize.firebaseapp.com",
  projectId: "annkoutize",
  storageBucket: "annkoutize.firebasestorage.app",
  messagingSenderId: "132877215131",
  appId: "1:132877215131:web:f1f75cd15994e1bb4d2d3e",
  measurementId: "G-5TXQ0S96H5",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

const googleProvider = new GoogleAuthProvider();

export { auth, db, storage, googleProvider };
