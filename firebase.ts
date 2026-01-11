
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getFunctions } from "firebase/functions";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBbl7tpyZKFUe4VO65G2JJ4true7N07Mps",
    authDomain: "mediassist-v2.firebaseapp.com",
    projectId: "mediassist-v2",
    storageBucket: "mediassist-v2.firebasestorage.app",
    messagingSenderId: "146028001320",
    appId: "1:146028001320:web:29a999430ddf3279781d1d",
    measurementId: "G-G2WMBD7VM6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const functions = getFunctions(app);
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export { app, db, auth, functions, analytics };
