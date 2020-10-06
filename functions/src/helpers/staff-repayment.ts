import { getDataFromQuerySnapShot } from "./utils"
import * as functions from 'firebase-functions';

interface Loan {
  status: number,
  amount: number,
  type: number,
  lenderEmpId: string,
  lenderStaffId: string,
  issuedBy: string,
  createdAt: FirebaseFirestore.Timestamp,
  emiAmount: number,
  id: string
}

interface LoanRepayment {
  createdAt: FirebaseFirestore.Timestamp,
  lenderEmpId: string,
  lenderStaffId: string,
  receivedBy: string,
  amount: number,
  loanId: string,
  id: string
}

enum STAFF_LOAN_STATUS_ENUM {
  PENDING = 0,
  PAID
}

const repaidSum = (sum: number, loan: LoanRepayment): number => {
  return sum + loan.amount
}

async function getLoanById(loanId: string, db: FirebaseFirestore.Firestore): Promise<any> {
  const snap = await db.collection('staffLoan').doc(loanId).get()
  return snap.data()
}

async function getRepaymentFor(loanId: string, db: FirebaseFirestore.Firestore): Promise<Array<LoanRepayment>> {
  const loanSnap = await db.collection('loanRepayment')
    .where('loanId', '==', loanId)
    .get()
  const loans: Array<LoanRepayment> = getDataFromQuerySnapShot('id', loanSnap)
  return loans
}

export async function getLoanStatus(empId: string, loanId: string, db: FirebaseFirestore.Firestore): Promise<{ pendingAmount: Number, status: STAFF_LOAN_STATUS_ENUM }> {
  const associatedLoan: Loan = await getLoanById(loanId, db)
  const loanAmount = associatedLoan.amount
  const loansPaid: Array<LoanRepayment> = await getRepaymentFor(loanId, db)
  const rePaidAmt = loansPaid.reduce(repaidSum, 0)
  functions.logger.info("loanAmount", loanAmount);
  functions.logger.info("rePaidAmt", rePaidAmt);
  const isPending = loanAmount > rePaidAmt;
  return { pendingAmount: loanAmount - rePaidAmt, status: isPending ? STAFF_LOAN_STATUS_ENUM.PENDING : STAFF_LOAN_STATUS_ENUM.PAID }
}

export function setPendingAsPaid(status: { pendingAmount: Number, status: STAFF_LOAN_STATUS_ENUM }, loanId: string, db: FirebaseFirestore.Firestore) {
  return db.collection('staffLoan').doc(loanId).set(status, { mergeFields: ["pendingAmount", "status"] })
}