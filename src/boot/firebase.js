import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCYT7VpmJfIeGqVCHlacwNh8Y0u_tnTpX4",
  authDomain: "blogology-ad87a.firebaseapp.com",
  projectId: "blogology-ad87a",
  storageBucket: "blogology-ad87a.appspot.com",
  messagingSenderId: "836540882685",
  appId: "1:836540882685:web:ae2e1abced4cdae205e894"
};

// Initialize Firebase
let firebaseApp = firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();
let firebaseAuth = firebaseApp.auth();

export default db;

export { firebaseAuth };
