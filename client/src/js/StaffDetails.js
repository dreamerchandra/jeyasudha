import { getDataFromQuerySnapShot, ref } from './firebase-helper'

export default class StaffDetails {
  constructor({ empId, name, payCycle, salary, docId = undefined }) {
    this.empId = empId
    this.name = name
    this.payCycle = payCycle
    this.salary = salary
    this.docId = docId
  }

  setDocId(docId) {
    this.docId = docId
  }

  toFirestore() {
    return {
      empId: this.empId,
      name: this.name,
      payCycle: this.payCycle,
      salary: this.salary,
    }
  }

  static fromFirestore(snapshot, options) {
    const data = snapshot.data(options)
    if (data) {
      return new StaffDetails(data)
    }
    return null
  }

  isFieldsValid = () => {
    return (
      this.salary > 0 && typeof this.payCycle === 'number' && this.empId && this.name
    )
  }

  static getByEmpId = async (empId) => {
    const staffData = await ref().staffDetails.where('empId', '==', empId).get()
    const [filteredStaff] = getDataFromQuerySnapShot('docId', staffData)
    if (filteredStaff) {
      return new StaffDetails(filteredStaff)
    }
    return null
  }

  pushToDb = async () => {
    return ref().staffDetails.doc().set(this.toFirestore())
  }

  upsertToDb = async () => {
    const fetchedData = await StaffDetails.getByEmpId(this.empId)
    if (fetchedData) {
      return ref().staffDetails.doc(fetchedData.docId).update(this.toFirestore())
    }
    return this.pushToDb()
  }
}
