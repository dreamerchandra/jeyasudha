import { getDataFromQuerySnapShot, ref } from './firebase-helper'

export const STAFF_LOAN_ENUM = {
  STATUS: {
    PENDING: 0,
    PAID: 1,
  },
  TYPE: {
    EMI: 0,
    ADVANCE: 1,
  },
}

export default async function getActiveLoans(empId) {
  const loanSnap = await ref()
    .staffLoan.where('status', '==', STAFF_LOAN_ENUM.STATUS.PENDING)
    .where('lenderEmpId', '==', empId)
    .get()
  const loans = getDataFromQuerySnapShot('id', loanSnap)
  return loans
}
