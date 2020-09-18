import { ref } from './firebase-helper'

export default class AccountData {
  constructor({ name, amount, purpose, extraField }) {
    this.name = name
    this.amount = Number(amount)
    this.purpose = purpose
    this.extraField = extraField
  }

  isFieldsValid() {
    return this.amount > 0
  }

  static toFirestore(accountData) {
    const data = {
      name: accountData.name,
      amount: accountData.amount,
      purpose: accountData.purpose,
    }
    if (accountData.extraField) {
      data.extraField = accountData.extraField
    }
    return data
  }

  static createFromUI({ nameRef, amountRef, purposeRef, extraFieldRef }) {
    const name = nameRef.current.value
    const purpose = purposeRef.current.value
    const amount = amountRef.current.value
    const extraField = extraFieldRef?.current?.value
    const data = new AccountData({ name, purpose, amount, extraField })
    if (data.isFieldsValid()) {
      return data
    }
    throw new Error('Amount should be greater than 0')
  }

  pushToDb = async () => {
    await ref().account.doc().withConverter(AccountData).set(this)
  }
}
