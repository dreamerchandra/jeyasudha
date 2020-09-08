import firebase from 'firebase/app'
import 'firebase/firestore'
import { ref } from './firebase-helper'

const CGST = 5
const SGST = 5

export default class BillingData {
  constructor(name, address, vehicleNumber, orderDetails, total) {
    this.name = name
    this.address = address
    this.vehicleNumber = vehicleNumber
    this.orderDetails = orderDetails
    this.total = total
    this.netTotal = total + (CGST * total) / 100 + (SGST * total) / 100
  }

  linkCustomerId(customerId) {
    this.customerId = customerId
  }

  convertThisToFirestore = () => {
    return {
      customerId: this.customerId,
      name: this.name,
      address: this.address,
      vehicleNumber: this.vehicleNumber,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      orders: [
        {
          particular: this.orderDetails.particularDetails,
          quantity: this.orderDetails.unit,
        },
      ],
      total: this.total,
      sgstCost: SGST * this.total,
      cgstCost: CGST * this.total,
      netTotal: this.netTotal,
    }
  }

  pushToDb = async (transaction) => {
    const newBillingRef = ref().billing.doc()
    await transaction.set(newBillingRef, this.convertThisToFirestore())
    this.billingDbRef = newBillingRef
    this.billId = this.billingDbRef.id
    console.log('pushed billing data to db')
    return this.billingDbRef.id
  }
}
