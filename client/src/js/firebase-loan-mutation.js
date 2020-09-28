import { getCurrentUserId, getServerTimeStamp, ref } from './firebase-helper'
import { STAFF_LOAN_ENUM } from './firebase-loan-query'

export async function createNewLoan({
  loanAmount,
  emiAmount,
  empId,
  typeOfLoan,
  staffDocId,
}) {
  const dataSnap = {
    status: STAFF_LOAN_ENUM.STATUS.PENDING,
    amount: loanAmount,
    type: typeOfLoan,
    lenderEmpId: empId,
    lenderStaffId: staffDocId,
    issuedBy: getCurrentUserId(),
    createdAt: getServerTimeStamp(),
  }
  if (typeOfLoan === STAFF_LOAN_ENUM.TYPE.EMI) dataSnap.emiAmount = emiAmount
  return ref().staffLoan.doc().set(dataSnap)
}
