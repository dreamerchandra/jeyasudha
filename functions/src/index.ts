import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { isPaymentPending, setPendingAsPaid } from './helpers/staff-repayment';

admin.initializeApp();
const db = admin.firestore();

export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", { structuredData: true });
  response.send("Hello1 from Firebase!");
});


export const updateStaffLoan = functions
  .firestore.document('loanRepayment/{repaymentId}')
  .onCreate(async (snapshot) => {
    const data = snapshot.data()
    const empId = data.lenderEmpId
    const loanId = data.loanId
    const isPending = await isPaymentPending(empId, loanId, db)
    functions.logger.info("is payment Pending", isPending);
    if (!isPending) {
      await setPendingAsPaid(loanId, db)
      functions.logger.info(`updated ${loanId} as PAID`);
      return
    }
    functions.logger.info(`${loanId} is still pending`);
    return null
  })