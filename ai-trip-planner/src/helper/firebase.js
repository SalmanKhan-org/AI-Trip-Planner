// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDxOvXFYY5Ah6iaHTRzP9xofi4UdTynM2w",
  authDomain: "ai-trip-planner-223017.firebaseapp.com",
  projectId: "ai-trip-planner-223017",
  storageBucket: "ai-trip-planner-223017.firebasestorage.app",
  messagingSenderId: "854792837903",
  appId: "1:854792837903:web:5b6d9396321faecd837c7a",
  measurementId: "G-Z095Q34H15",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
