// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBz5Aon0OQuxM92znxZX_QnCaB1iTzXSdg",
  authDomain: "clean-community-9b33e.firebaseapp.com",
  projectId: "clean-community-9b33e",
  storageBucket: "clean-community-9b33e.firebasestorage.app",
  messagingSenderId: "145510904406",
  appId: "1:145510904406:web:fc318090940e5632c6c1f7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
