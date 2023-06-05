// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
//Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyAHZdI_RvZN3KmdB7Ve9iwCYb2ZwQDAo88",
  authDomain: "linkedin-clone-bf6a5.firebaseapp.com",
  projectId: "linkedin-clone-bf6a5",
  storageBucket: "linkedin-clone-bf6a5.appspot.com",
  messagingSenderId: "1098764697603",
  appId: "1:1098764697603:web:7510699779cef548eb8e36",
  measurementId: "G-G67JVKNNC6",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
