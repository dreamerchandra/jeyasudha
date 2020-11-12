import firebase from 'firebase/app'
import 'firebase/auth'

export const loginWithEmail = async ({ email, password }) => {
  if (email === 'jeyasudhaconstructions999@gmail.com') {
    return firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .catch((err) => {
            console.error(`login with firebase failed with ${err.message}`)
          })
      })
      .catch((err) => {
        console.error(`setting persistance failed with ${err.message}`)
      })
  }
  return firebase.auth().signInWithEmailAndPassword(email, password)
}

export const signupWithEmail = async ({ email, password }) => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .catch((err) => {
      console.error(`sign with firebase failed with ${err.message}`)
    })
}
export const logout = async () => {
  return firebase
    .auth()
    .signOut()
    .catch((err) => {
      console.error(`logout with firebase failed with ${err.message}`)
    })
}

export const sendPasswordResetEmail = async ({ email }) => {
  return firebase
    .auth()
    .sendPasswordResetEmail(email, {
      url: window.location.href,
    })
    .catch((err) => {
      console.error(`send password reset email failed with ${err.message}`)
    })
}
