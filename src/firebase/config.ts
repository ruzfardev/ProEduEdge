// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDQHFQKD_WeJO2TS-rHQ87yja3a_Kn73zA",
  authDomain: "proeduedge.firebaseapp.com",
  projectId: "proeduedge",
  storageBucket: "proeduedge.appspot.com",
  messagingSenderId: "904641277157",
  appId: "1:904641277157:web:0574a93c9949a878aa380c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const storage = getStorage(app);