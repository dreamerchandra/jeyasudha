
import { auth } from 'firebase';

export const loginWithEmail = ({ email, password }) => {
  auth().signInWithEmailAndPassword(email, password);
};

export const signupWithEmail = ({ email, password }) => {
  auth().createUserWithEmailAndPassword(email, password);
}
export const logout = () => {
  auth().signOut();
};