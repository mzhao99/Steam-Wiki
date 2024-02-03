// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "steam-wiki.firebaseapp.com",
  projectId: "steam-wiki",
  storageBucket: "steam-wiki.appspot.com",
  messagingSenderId: "813034397930",
  appId: "1:813034397930:web:31305a57a91d48b45e3793"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);