import firebase from 'firebase/app'
import 'firebase/firestore'
import { ref } from './firebase-helper'

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
    return typeof this.grandTotal === 'number' && this.name && this.address
  }

  linkCustomerId(customerId) {
    this.customerId = customerId
  }

  getBillId() {
    return this.billId
  }

  convertThisToFirestore = () => {
    this.createdAt = firebase.firestore.FieldValue.serverTimestamp()
    const snapshot = {
      customerId: this.customerId,
      name: this.name,
      address: this.address,
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

  pushToDb = (transaction) => {
    transaction.set(this.billingDbRef, this.convertThisToFirestore())
    console.log('pushed billing data to db', this.billId)
    return this.billingDbRef.id
  }
}
