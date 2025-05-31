// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCcItwiV96X6KWLpEqA8hDuFOleEuJuax0",
  authDomain: "restoping-36983.firebaseapp.com",
  projectId: "restoping-36983",
  storageBucket: "restoping-36983.firebasestorage.app",
  messagingSenderId: "510868776598",
  appId: "1:510868776598:web:4811c247f9d1d1e81184b7",
  measurementId: "G-KE3WYB4SPT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// eslint-disable-next-line no-unused-vars
const analytics = getAnalytics(app);