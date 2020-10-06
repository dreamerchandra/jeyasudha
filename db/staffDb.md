{
  attendance: {
    <attendance-id>: {
      createdAt: <timestamp>,
      absent: [<staff-id>]
    }
  },
  staffLoan: {
    <loan-id>: {
      status: <PENDING:0, PAID: 1>,
      amount: <number>,
      type: <EMI: 0, ADVANCE: 1>,
      lenderEmpId: <staffDetails.empId>,
      lenderStaffId: <staff-id>,
      issuedBy: <login-id>,
      createdAt: <timestamp>,
      emiAmount: <number>,
      pendingAmount: <number>,
    }
  },
  loanRepayment: {
    <repayment-id>: {
      createdAt: <timestamp>,
      lenderEmpId: <staffDetails.empId>,
      lenderStaffId: <staff-id>,
      receivedBy: <login-id>,
      amount: <number>,
      loanId: <loan-id>
    }
  }
  staffDetails: {
    <staff-id>: {
      empId: <str>,
      name: <str>,
      payCycle: <MONTH:0, WEEK: 1>,
      salary: <number>
    }
  },
  salaryCredit: {
    <credited-id>: {
      empId: <staffDetails.empId>,
      staffId: <staff-id>,
      createdAt: <timestamp>,
      name: <string>,
      workingDays: <days>,
      salary: <amount>,
      deductions: <amount>,
      netSalary: <amount>,
      payCycleStart: <timestamp>
    }
  }
}