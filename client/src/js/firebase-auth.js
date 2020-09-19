import firebase from 'firebase/app'
import 'firebase/auth'

export const loginWithEmail = ({ email, password }) => {
  if (email === 'jeyasudhaconstructions999@gmail.com') {
    return firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        firebase.auth().signInWithEmailAndPassword(email, password)
      })
  }
  return firebase.auth().signInWithEmailAndPassword(email, password)
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
