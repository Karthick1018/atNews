// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC_v0MvyIQp7U8Hkf27I4BAkPe_yebvfZ0",
    authDomain: "atnews-1810.firebaseapp.com",
    projectId: "atnews-1810",
    storageBucket: "atnews-1810.appspot.com",
    messagingSenderId: "205461655074",
    appId: "1:205461655074:web:3da665a5693b3e06bd047b",
    measurementId: "G-K5L4XY23VR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);