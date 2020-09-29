import firebase from 'firebase/app'
import 'firebase/firestore'
import { ref } from './firebase-helper'

const MAX_BILL_ID = 9999
export default class BillingData {
  constructor(
    name,
    address,
    vehicleNumber,
    orderDetails,
    orderNames,
    orderIds,
    phoneNumber,
    driverName,
    amountPaid,
    subTotal,
    grandTotal,
    cgstTotal,
    sgstTotal
  ) {
    this.name = name
    this.address = address
    this.vehicleNumber = vehicleNumber
    this.orderDetails = orderDetails
    this.phoneNumber = phoneNumber
    this.driverName = driverName
    this.amountPaid = amountPaid
    this.orderNames = orderNames
    this.orderIds = orderIds
    this.subTotal = Number(subTotal)
    this.cgstTotal = Number(cgstTotal)
    this.sgstTotal = Number(sgstTotal)
    this.grandTotal = Number(grandTotal)
    const newBillingRef = ref().billing.doc()
    this.billingDbRef = newBillingRef
    this.billId = this.billingDbRef.id
  }

  isFieldsValid() {
    return typeof this.grandTotal === 'number' && this.address && this.phoneNumber
  }

  linkCustomerId(customerId) {
    this.customerId = customerId
  }

  convertThisToFirestore = () => {
    this.createdAt = firebase.firestore.FieldValue.serverTimestamp()
    const snapshot = {
      customerId: this.customerId,
      name: this.name,
      address: this.address,
      numberedBillId: this.numberedBillId,
      vehicleNumber: this.vehicleNumber,
      createdAt: this.createdAt,
      subTotal: Number(this.subTotal),
      sgstCost: Number(this.sgstTotal),
      cgstCost: Number(this.cgstTotal),
      grandTotal: Number(this.grandTotal),
      amountPaid: Number(this.amountPaid),
      phoneNumber: this.phoneNumber,
      driverName: this.driverName,
    }
    if (this.orderDetails) {
      snapshot.orders = [
        {
          particular: this.orderDetails.particularDetails,
          quantity: this.orderDetails.unit,
        },
      ]
      snapshot.orderNames = this.orderNames
      snapshot.orderIds = this.orderIds
    }
    return snapshot
  }

  pushToDb = async (transaction) => {
    await this.upsetNumberedBillId(transaction)
    transaction.set(this.billingDbRef, this.convertThisToFirestore())
    console.log('pushed billing data to db', this.billId)
    return this.billingDbRef.id
  }

  /**
   *
   * @param {firebase.firestore.Transaction} transaction
   */
  upsetNumberedBillId = async (transaction) => {
    if (typeof this.numberedBillId !== 'number')
      throw new Error('Bill Id not generated')
    const billingMetaRef = ref().metaData.doc('billing')
    transaction.set(billingMetaRef, {
      numberedBillId: this.numberedBillId,
    })
  }

  generateNumberedBillId = async () => {
    const billingMetaRef = ref().metaData.doc('billing')
    const metaSnap = await billingMetaRef.get()
    if (!metaSnap.exists) {
      this.numberedBillId = 0
    } else {
      const preCount = metaSnap.data().numberedBillId
      this.numberedBillId = preCount > MAX_BILL_ID + 1 ? 0 : preCount + 1
    }
  }
}
