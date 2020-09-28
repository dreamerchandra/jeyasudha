import getActiveLoans, { STAFF_LOAN_ENUM } from './firebase-loan-query'
import { floatToMoney } from './helper/utils'
import StaffDetails from './StaffDetails'

const sumPending = (prePending, loan) => {
  if (loan.status === STAFF_LOAN_ENUM.STATUS.PAID) return prePending
  if (loan.type === STAFF_LOAN_ENUM.TYPE.ADVANCE) {
    return prePending + loan.amount
  }
  if (loan.type === STAFF_LOAN_ENUM.TYPE.EMI) {
    return prePending + loan.emiAmount
  }
  return prePending
}

export async function proceedIfLoanEligible({
  loanAmount,
  emiAmount,
  empId,
  typeOfLoan,
}) {
  const staffDetails = await StaffDetails.getByEmpId(empId)
  if (!staffDetails) throw new Error('Employee Id not found')
  const loans = await getActiveLoans(empId)
  const pendingDues = loans.reduce(sumPending, 0)
  const { salary } = staffDetails
  let predictedDues = pendingDues
  if (typeOfLoan === STAFF_LOAN_ENUM.TYPE.ADVANCE) {
    predictedDues += loanAmount
  } else {
    predictedDues += emiAmount
  }

  if (predictedDues > salary) {
    throw new Error(
      `Dues Rs.${floatToMoney(
        predictedDues
      )} will be higher than salary: Rs:${floatToMoney(salary)}`
    )
  }
  return {
    staffDetails,
  }
}

export async function getLoanDetails(empId) {
  const loans = await getActiveLoans(empId)
  const deduction = loans.reduce(sumPending, 0)
  return { deduction, loans }
}
