import { initializeApp } from "firebase/app";

export default function initializeFirebase () {
  const firebaseConfig = {
    apiKey: "AIzaSyA0P_eopNWIL23qYYnu4FOxkID6SK2zBLA",
    authDomain: "arudino1-3381d.firebaseapp.com",
    databaseURL: "https://arudino1-3381d.firebaseio.com",
    projectId: "arudino1-3381d",
    storageBucket: "arudino1-3381d.appspot.com",
    messagingSenderId: "1004597171360",
    appId: "1:1004597171360:web:bf073b9fd7b802a898a5c5"
  };
  console.log('initalizing app')
  window.firebase = initializeApp(firebaseConfig);
}