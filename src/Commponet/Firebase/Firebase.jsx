// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD6feNqYzA9NHaIdo-wRur-nDXC5Bdkwvs",
  authDomain: "liton-web.firebaseapp.com",
  projectId: "liton-web",
  storageBucket: "liton-web.firebasestorage.app",
  messagingSenderId: "905178321797",
  appId: "1:905178321797:web:2d3bf97aa437606d242aec"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;