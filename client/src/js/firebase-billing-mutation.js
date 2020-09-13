import { ref } from './firebase-helper'

function updateLedgerData(ledgerData, billId, userId, firestoreTransaction) {
  if (!ledgerData) return
  if (ledgerData && billId) {
    ledgerData.linkBillId(billId)
  }
  ledgerData.linkCustomerId(userId)
  if (ledgerData.shouldUpdateToFirebase()) {
    ledgerData.pushToDb(firestoreTransaction)
  }
}
/**
 *
 * @param {{userData: CustomerDetail, billingData: BillingData, ledgerDataForMaterials: LedgerData}} param0
 */
function _updateBillingData({ userData, billingData = null, ledgers }) {
  return ref().db.runTransaction(async (transaction) => {
    await userData.updateDueAndUserIdFromDb()
    userData.pushToDb(transaction)
    if (billingData) {
      billingData.linkCustomerId(userData.userId)
      billingData.pushToDb(transaction)
    }
    ledgers.forEach((ledger) => {
      updateLedgerData(ledger, billingData?.billId, userData.userId, transaction)
    })
  })
}

export async function updateBillingData({
  userData,
  billingData,
  ledgerDataForMaterials,
  ledgerDataForCredit,
}) {
  try {
    await _updateBillingData({
      userData,
      billingData,
      ledgers: [ledgerDataForCredit, ledgerDataForMaterials],
    })
    console.log('billing data updated')
  } catch (err) {
    console.error('updated billing data failed with', err.message)
    throw err
  }
}

export async function updateCustomerDue({ userData, ledgerData }) {
  try {
    await _updateBillingData({
      userData,
      ledgers: [ledgerData],
    })
    console.log('updated customer data')
  } catch (err) {
    console.error('updated customer data failed with', err.message)
    throw err
  }
}
