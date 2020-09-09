import { getDataFromQuerySnapShot, ref } from './firebase-helper'

export default class CustomerDetail {
  constructor(
    name,
    currentDue,
    primaryAddress,
    vehicleNumber,
    driverName,
    phoneNumber
  ) {
    this.name = name
    this.currentDue = currentDue
    this.primaryAddress = primaryAddress
    this.vehicleNumber = vehicleNumber
    this.driverName = driverName
    this.phoneNumber = phoneNumber
  }

  isFieldsValid() {
    return this.name && this.primaryAddress && this.phoneNumber
  }

  updateCurrentDue(currentDue) {
    this.currentDue = currentDue
  }

  getUserDetailsFromDb = async (transaction) => {
    const userData = await transaction.get(
      ref().customer.where('phoneNumber', '==', this.phoneNumber).get()
    )
    const [userDetails] = getDataFromQuerySnapShot('id', userData)
    return userDetails || {}
  }

  /**
   *
   * @param {firebase.firestore.Transaction} transaction
   */
  updateDueAndUserIdFromDb = async () => {
    let userData = null
    const queryRef = ref().customer.where('phoneNumber', '==', this.phoneNumber)
    const [userDoc] = getDataFromQuerySnapShot('id', await queryRef.get())
    if (userDoc?.id) {
      userData = userDoc
      this.userId = userDoc.id
      console.log(
        'found existing customer based on phone number and user id:',
        userDoc.id
      )
    }
    if (!this.userId) {
      this.userId = ref().customer.doc().id
      console.log('new user creating at:', this.userId)
    }
    this.currentDue += userData?.overallDue || 0
    console.log('updated overall due to:', this.currentDue)
  }

  convertThisToFirestore() {
    return {
      name: this.name,
      overallDue: this.currentDue,
      primaryAddress: this.primaryAddress,
      vehicleNumber: this.vehicleNumber,
      driverName: this.driverName,
      phoneNumber: this.phoneNumber,
    }
  }

  /**
   *
   * @param {firebase.firestore.Transaction} transaction
   */
  pushToDb = (transaction) => {
    transaction.set(ref().customer.doc(this.userId), this.convertThisToFirestore(), {
      merge: true,
    })
    console.log('pushed user data to db', this.userId)
  }
}
