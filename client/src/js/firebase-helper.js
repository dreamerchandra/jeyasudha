import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

export const ref = () => {
  const db = firebase.firestore()
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
    salaryCredit: db.collection('salaryCredit'),
    loanRepayment: db.collection('loanRepayment'),
    userRole: db.collection('role'),
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

export function constructQuerySelectorBasedOnCreatedAt({
  docRef,
  date = new Date(),
  fieldPath = 'createdAt',
  positiveOffsetDays = 0,
  negativeOffsetDays = 0,
}) {
  const start = new Date(date)
  const end = new Date(date)
  start.setMinutes(0)
  start.setHours(0)
  start.setSeconds(0)
  start.setDate(date.getDate() - negativeOffsetDays)
  end.setMinutes(59)
  end.setHours(23)
  end.setSeconds(59)
  end.setDate(date.getDate() + positiveOffsetDays)
  return docRef.where(fieldPath, '>=', start).where(fieldPath, '<=', end)
}

export function convertFirebaseTimeStampToString(firebaseTimeStamp) {
  if (firebaseTimeStamp)
    return new Date(firebaseTimeStamp.seconds * 1000).toLocaleString('en-IN')
  return 'NA'
}
