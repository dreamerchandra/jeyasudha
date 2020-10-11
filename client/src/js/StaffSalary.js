import getAbsent, { PAY_CYCLE_ENUM } from './firbase-attendance-query'
import { getCurrentUserId, getServerTimeStamp, ref } from './firebase-helper'
import { STAFF_LOAN_ENUM } from './firebase-loan-query'
import { getLoanDetails } from './loan'
import StaffDetails from './StaffDetails'

export default class StaffSalary {
  constructor(empId, startDate) {
    if (!empId) throw new Error('Missing emp id')
    if (!startDate) throw new Error('Missing start date')
    this.empId = empId
    this.startDate = startDate
  }

  getSalaryPayOutDetails = async () => {
    this.staff = await StaffDetails.getByEmpId(this.empId)
    if (!this.staff) throw new Error('employee id not found')
    const payDays = this.staff.payCycle === PAY_CYCLE_ENUM.MONTHLY ? 30 : 7
    const endDate = new Date(new Date().setDate(this.startDate.getDate() + payDays))
    let absentDays = 0
    if (this.staff.payCycle === PAY_CYCLE_ENUM.WEEKLY) {
      const absentData = await getAbsent({
        empId: this.empId,
        endDate,
        startDate: this.startDate,
      })
      absentDays = absentData.length
    }
    this.workingDay = payDays - absentDays
    const perDaySalary = this.staff.salary / payDays
    this.salaryOnAbsentDays = absentDays * perDaySalary
    const { deduction, loans } = await getLoanDetails(this.empId)
    this.loanDeduction = deduction
    this.loans = loans
    this.payableSalary =
      this.staff.salary - this.salaryOnAbsentDays - this.loanDeduction
    this.deductions = this.staff.salary - this.payableSalary

    return {
      staff: this.staff,
      workingDay: this.workingDay,
      deductions: this.deductions,
      payableSalary: this.payableSalary,
    }
  }

  convertThisToSalaryCreditSnap = () => ({
    empId: this.empId,
    staffId: this.staff.docId,
    createdAt: getServerTimeStamp(),
    name: this.staff.name,
    workingDays: this.workingDay,
    salary: this.staff.salary,
    deductions: this.deductions,
    netSalary: this.payableSalary,
    payCycleStart: this.startDate,
    payCycle: this.staff.payCycle,
  })

  recordPayout = (transaction) => {
    return transaction.set(
      ref().salaryCredit.doc(),
      this.convertThisToSalaryCreditSnap()
    )
  }

  recordLoanRepayment = (transaction) => {
    this.loans.forEach((loan) => {
      const amount =
        loan.type === STAFF_LOAN_ENUM.TYPE.EMI ? loan.emiAmount : loan.amount
      transaction.set(ref().loanRepayment.doc(), {
        createdAt: getServerTimeStamp(),
        lenderEmpId: this.empId,
        lenderStaffId: this.staff.docId,
        receivedBy: getCurrentUserId(),
        amount,
        loanId: loan.id,
      })
    })
    return transaction
  }

  pushToDb = async () => {
    await ref().db.runTransaction((transaction) => {
      this.recordPayout(transaction)
      this.recordLoanRepayment(transaction)
      return Promise.resolve()
    })
  }

  static calculateNetSalaryList({ staffDetails, startDate }) {
    if (!staffDetails) return null
    return Promise.all(
      staffDetails.map(async (staff) => {
        const staffSalary = new StaffSalary(staff.empId, startDate)
        await staffSalary.getSalaryPayOutDetails()
        return staffSalary
      })
    )
  }
}
