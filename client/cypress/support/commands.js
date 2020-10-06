import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import { attachCustomCommands } from "cypress-firebase";

const fbConfig = {
  apiKey: 'AIzaSyA0P_eopNWIL23qYYnu4FOxkID6SK2zBLA',
  authDomain: 'arudino1-3381d.firebaseapp.com',
  databaseURL: 'https://arudino1-3381d.firebaseio.com',
  projectId: 'arudino1-3381d',
  storageBucket: 'arudino1-3381d.appspot.com',
  messagingSenderId: '1004597171360',
  appId: '1:1004597171360:web:bf073b9fd7b802a898a5c5',
};

firebase.initializeApp(fbConfig);


const shouldUseEmulator = window.location.hostname === "localhost";
const firestoreSettings = {};
if (window.Cypress) {
  // Needed for Firestore support in Cypress (see https://github.com/cypress-io/cypress/issues/6350)
  firestoreSettings.experimentalForceLongPolling = true;
}

// Emulate Firestore
if (shouldUseEmulator) {
  firestoreSettings.host = "localhost:8080";
  firestoreSettings.ssl = false;
  console.debug(`Using Firestore emulator: ${firestoreSettings.host}`);
  firebase.firestore().settings(firestoreSettings);
}


attachCustomCommands({ Cypress, cy, firebase });