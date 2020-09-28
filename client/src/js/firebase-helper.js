import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

export const ref = () => {
  const db = firebase.firestore()
  if (window.location.hostname === 'localhost') {
    db.settings({
      host: 'localhost:8080',
      ssl: false,
    })
  }
  return {
    customer: db.collection('customer'),
    billing: db.collection('billing'),
    ledger: db.collection('ledger'),
    productPricing: db.collection('productPricing'),
    account: db.collection('account'),
    metaData: db.collection('metaData'),
    staffDetails: db.collection('staffDetails'),
    attendance: db.collection('attendance'),
    staffLoan: db.collection('staffLoan'),
    db,
  }
}

export const getDataFromQuerySnapShot = (idKey, documentData) => {
  const returnResult = []
  documentData.forEach((doc) => {
    const data = doc.data()
    const { id } = doc
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
  return returnResult
}

export function getServerTimeStamp() {
  return firebase.firestore.FieldValue.serverTimestamp()
}

export function getCurrentUserId() {
  return firebase.auth().currentUser.uid
}
