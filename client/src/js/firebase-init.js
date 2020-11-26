import { initializeApp } from 'firebase/app'

export default function initializeFirebase() {
  const firebaseConfig = {
    apiKey: 'AIzaSyAfbjKQKQ3eueeHS9XVyIpJnoG9DR6isJs',
    authDomain: 'jeyasudha-716bd.firebaseapp.com',
    databaseURL: 'https://jeyasudha-716bd.firebaseio.com',
    projectId: 'jeyasudha-716bd',
    storageBucket: 'jeyasudha-716bd.appspot.com',
    messagingSenderId: '913579087424',
    appId: '1:913579087424:web:f9ff1e7c725cd02d30f1a5',
  }
  initializeApp(firebaseConfig)
  console.log('initalizing app')
}
