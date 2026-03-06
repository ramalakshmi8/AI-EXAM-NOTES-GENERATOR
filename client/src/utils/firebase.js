import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "authexamnotes-fb939.firebaseapp.com",
  projectId: "authexamnotes-fb939",
  storageBucket: "authexamnotes-fb939.firebasestorage.app",
  messagingSenderId: "345580489643",
  appId: "1:345580489643:web:3072815e95c775cd6a60ee",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };
