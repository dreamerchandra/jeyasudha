import { ref } from './firebase-helper'

export async function createSalary({
  empId,
  staffId,
  createdAt,
  name,
  workingDays,
  salary,
  deductions,
  netSalary,
  payCycleStart,
}) {
  ref().salaryCredit.doc().set({
    empId,
    staffId,
    createdAt,
    name,
    workingDays,
    salary,
    deductions,
    netSalary,
    payCycleStart,
  })
}
