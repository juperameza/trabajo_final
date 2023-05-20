// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import {
  getFirestore,
  doc,
  setDoc,
  getDocs,
  addDoc,
  collection,
} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB53Yx44kpbTjA5X_XsEDkX8wM3fjvmNpY",
  authDomain: "trabajo-final-86064.firebaseapp.com",
  projectId: "trabajo-final-86064",
  storageBucket: "trabajo-final-86064.appspot.com",
  messagingSenderId: "756950880683",
  appId: "1:756950880683:web:58bc5c8277ff7309a702ee",
  measurementId: "G-V7ETSRTKD1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const firestore = getFirestore(app);

export { firestore, doc, setDoc, getDocs, addDoc, collection };
