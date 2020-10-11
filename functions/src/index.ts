import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { getLoanStatus, setPendingAsPaid } from './helpers/staff-repayment';

admin.initializeApp();
const db = admin.firestore();

export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", { structuredData: true });
  response.send("Hello1 from Firebase!");
});


export const updateStaffLoan = functions.region('asia-east2')
  .firestore.document('loanRepayment/{repaymentId}')
  .onCreate(async (snapshot) => {
    const data = snapshot.data()
    const empId = data.lenderEmpId
    const loanId = data.loanId
    const {pendingAmount, status} = await getLoanStatus(empId, loanId, db)
    functions.logger.info(`Loan status: pendingAmount: pendingAmount: ${pendingAmount}, status: ${status}`);
    await setPendingAsPaid({ pendingAmount, status }, loanId, db);
    functions.logger.info(`updated ${loanId} as PAID`);
    return
  })