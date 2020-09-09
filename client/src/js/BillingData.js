import firebase from 'firebase/app'
import 'firebase/firestore'
import { ref } from './firebase-helper'
import { PAYMENT_TYPE } from './LedgerData'

const CGST = 5
const SGST = 5

export default class BillingData {
  constructor(name, address, vehicleNumber, orderDetails, total, typeOfPayment) {
    this.name = name
    this.address = address
    this.vehicleNumber = vehicleNumber
    this.orderDetails = orderDetails
    this.subTotal = total
    this.typeOfPayment = typeOfPayment
    this.cgstTotal = (CGST * total) / 100
    this.sgstTotal = (SGST * total) / 100
    this.grandTotal = total + this.cgstTotal + this.sgstTotal
  }

  isFieldsValid() {
    return (
      this.grandTotal &&
      this.name &&
      this.address &&
      typeof this.typeOfPayment === 'number'
    )
  }

  shouldGenerateBill() {
    return this.typeOfPayment === PAYMENT_TYPE.CASH
  }

  linkCustomerId(customerId) {
    this.customerId = customerId
  }

  convertThisToFirestore = () => {
    this.createdAt = firebase.firestore.FieldValue.serverTimestamp()
    return {
      customerId: this.customerId,
      name: this.name,
      address: this.address,
      vehicleNumber: this.vehicleNumber,
      paymentType: this.typeOfPayment,
      createdAt: this.createdAt,
      orders: [
        {
          particular: this.orderDetails.particularDetails,
          quantity: this.orderDetails.unit,
        },
      ],
      subTotal: this.subTotal,
      sgstCost: (SGST * this.subTotal) / 100,
      cgstCost: (CGST * this.subTotal) / 100,
      grandTotal: this.grandTotal,
    }
  }

  pushToDb = (transaction) => {
    const newBillingRef = ref().billing.doc()
    transaction.set(newBillingRef, this.convertThisToFirestore())
    this.billingDbRef = newBillingRef
    this.billId = this.billingDbRef.id
    console.log('pushed billing data to db', this.billId)
    return this.billingDbRef.id
  }
}
