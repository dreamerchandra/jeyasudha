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
    billing: db.collection('billing'),
    ledger: db.collection('ledger'),
    productPricing: db.collection('productPricing'),
    db,
  }
}


export const getDataFromQuerySnapShot = (idKey, documentData) => {
  let returnResult = [];
  documentData.forEach((doc) => {
    const data = doc.data();
    const id = doc.id;
    if (idKey) {
      returnResult.push({
        ...data,
        [idKey]: id,
      })
    } else {
      returnResult.push({
        ...data,
      })
    }
  })
  return returnResult;
}