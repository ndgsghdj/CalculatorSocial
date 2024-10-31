// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAHtzpWCbvOI_urE8U1HNQFoYxntAN9l6o",
  authDomain: "calculator-social.firebaseapp.com",
  projectId: "calculator-social",
  storageBucket: "calculator-social.appspot.com",
  messagingSenderId: "831540565558",
  appId: "1:831540565558:web:695f4154edf1356864ea97"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app);

export { auth, db }
