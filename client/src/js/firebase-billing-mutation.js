import { ref } from './firebase-helper'

/**
 *
 * @param {{userData: CustomerDetail, billingData: BillingData, ledgerData: LedgerData}} param0
 */
function _updateBillingData({ userData, billingData = null, ledgerData }) {
  return ref().db.runTransaction(async (transaction) => {
    await userData.updateDueAndUserIdFromDb()
    userData.pushToDb(transaction)
    if (billingData) {
      billingData.linkCustomerId(userData.userId)
      billingData.pushToDb(transaction)
      ledgerData.linkBillId(billingData.billId)
    }
    ledgerData.linkCustomerId(userData.userId)
    ledgerData.pushToDb(transaction)
  })
}

export async function updateBillingData({ userData, billingData, ledgerData }) {
  try {
    await _updateBillingData({
      userData,
      billingData,
      ledgerData,
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
      ledgerData,
    })
    console.log('updated customer data')
  } catch (err) {
    console.error('updated customer data failed with', err.message)
    throw err
  }
}
