// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDwP1xpwJIcYy3hYKNeG9y4ERhSU_YygOk",
  authDomain: "edulab-986bf.firebaseapp.com",
  projectId: "edulab-986bf",
  storageBucket: "edulab-986bf.appspot.com",
  messagingSenderId: "855895855377",
  appId: "1:855895855377:web:a3aaf33b52912ff093fcb0",
  measurementId: "G-Q3Y0NTG4VC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);