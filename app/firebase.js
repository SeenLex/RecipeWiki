// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDR23z0jlLslby8gMulYXpxWeEyFVMzUnY",
  authDomain: "recipe-wiki-c75d8.firebaseapp.com",
  projectId: "recipe-wiki-c75d8",
  storageBucket: "recipe-wiki-c75d8.appspot.com",
  messagingSenderId: "681991280980",
  appId: "1:681991280980:web:cb4a9176608926bbbed0c1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };