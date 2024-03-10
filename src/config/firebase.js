// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2hNf6j7EfYUttBkN7uNmLsRTffAGfjwo",
  authDomain: "eam-project-44f44.firebaseapp.com",
  projectId: "eam-project-44f44",
  storageBucket: "eam-project-44f44.appspot.com",
  messagingSenderId: "524994958429",
  appId: "1:524994958429:web:535fc40eb48c966bd1e9b4",
  measurementId: "G-WY6M9K2NR8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { firebaseConfig};