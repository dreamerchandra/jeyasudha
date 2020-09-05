import * as firebase from 'firebase';


export const ref = () => {
  let db = firebase.firestore();
  // if (window.location.hostname === "localhost") {
  //   db.settings({
  //     host: "localhost:8080",
  //     ssl: false
  //   });
  // }
  return {
    customer: db.collection('customer'),
  }
}