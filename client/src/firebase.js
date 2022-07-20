import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC8xj_sZf6bxwXhbOihDQFl9iCEJHjoXv8",
  authDomain: "clone-e334e.firebaseapp.com",
  projectId: "clone-e334e",
  storageBucket: "clone-e334e.appspot.com",
  messagingSenderId: "1048671018870",
  appId: "1:1048671018870:web:a23905975d802a063be457",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;
