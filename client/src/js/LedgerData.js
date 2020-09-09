import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import { ref } from './firebase-helper'

export const PAYMENT_TYPE = {
  CASH: 0,
  CREDIT: 1,
}

export const PAID_FOR = {
  MATERIALS: 0,
  DUE: 1,
}

export default class LedgerData {
  constructor(total, netTotal, paymentType, paidFor) {
    this.total = total
    this.paymentType = paymentType
    this.netTotal = netTotal
    this.paidFor = paidFor
  }

  isFieldsValid() {
    return (
      this.netTotal &&
      typeof this.paymentType === 'number' &&
      typeof this.paidFor === 'number'
    )
  }

  shouldGenerateBill() {
    return this.paymentType === PAYMENT_TYPE.CASH
  }

  linkBillId(billId) {
    this.billId = billId
  }

  linkCustomerId(customerId) {
    this.customerId = customerId
  }

  convertThisToFirestore = () => {
    const snapshot = {
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      customerId: this.customerId,
      staffId: firebase.auth().currentUser.uid,
      total: this.total,
      netTotal: this.netTotal,
      paymentType: this.paymentType,
      paidFor: this.paidFor,
    }
    if (this.billId) {
      snapshot.billId = this.billId
    }
    return snapshot
  }

  pushToDb = (transaction) => {
    const newLedgerRef = ref().ledger.doc()
    transaction.set(newLedgerRef, this.convertThisToFirestore())
    console.log('pushed ledger data to db', newLedgerRef.id)
  }
}
