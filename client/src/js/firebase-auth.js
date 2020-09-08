import firebase from 'firebase/app'
import 'firebase/auth'

export const loginWithEmail = ({ email, password }) => {
  firebase.auth().signInWithEmailAndPassword(email, password)
}

export const signupWithEmail = ({ email, password }) => {
  firebase.auth().createUserWithEmailAndPassword(email, password)
}
export const logout = () => {
  firebase.auth().signOut()
}

export const sendPasswordResetEmail = ({ email }) => {
  firebase.auth().sendPasswordResetEmail(email, {
    url: window.location.href,
  })
}
