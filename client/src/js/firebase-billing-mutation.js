import firebase from 'firebase/app'
import 'firebase/firestore'
import { ref } from './firebase-helper'

export const PAYMENT_TYPE = {
  CASH: 0,
  CREDIT: 1,
}
/**
 *
 * @param {firebase.firestore.Transaction} transaction
 */
async function getCurrentDue(transaction, userId) {
  const userData = await transaction.get(ref().customer.doc(userId))
  return userData.data().overallDue
}

function getNewDue(oldDue, paymentType, amount) {
  if (paymentType === PAYMENT_TYPE.CASH) {
    return oldDue
  }
  return oldDue + amount
}
/**
 *
 * @param {firebase.firestore.Transaction} transaction
 * @param {String} userId
 */
function upsertCustomerData(transaction, userId, userData) {
  const userDocRef = userId ? ref().customer.doc(userId) : ref().customer.doc()
  transaction.set(userDocRef, userData, { merge: true })
  return userDocRef.id
}

/**
 *
 * @param {firebase.firestore.Transaction} transaction
 */
function createBill(transaction, billingData) {
  const newBillingRef = ref().billing.doc()
  transaction.set(newBillingRef, {
    ...billingData,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  })
  return newBillingRef.id
}

function createLedger(transaction, ledgerData) {
  const newLedgerRef = ref().ledger.doc()
  transaction.set(newLedgerRef, {
    ledgerData,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  })
}

function _updateBillingData({ userData, billingData, ledgerData, userId = '' }) {
  return ref().db.runTransaction((transaction) => {
    const currentDue = userId ? getCurrentDue(transaction, userId) : 0
    const data = {
      ...userData,
      overallDue: getNewDue(currentDue, ledgerData.paymentType, ledgerData.amount),
    }
    const updatedUserId = upsertCustomerData(transaction, userId, data)
    let billId = ''
    if (ledgerData.paymentType === PAYMENT_TYPE.CASH) {
      billId = createBill(transaction, billingData)
    }
    createLedger(transaction, { ...ledgerData, billId, customerId: updatedUserId })
  })
}

export async function updateBillingData({
  userData,
  billingData,
  ledgerData,
  userId = '',
}) {
  try {
    await _updateBillingData({
      userData,
      billingData,
      ledgerData,
      userId,
    })
    console.log('billing data updated')
  } catch (err) {
    console.error('updated billing data failed with', err.message)
    throw err
  }
}
