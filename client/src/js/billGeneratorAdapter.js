import CustomerDetail from './CustomerDetail'
import BillingData from './BillingData'
import LedgerData, { PAYMENT_TYPE, PAID_FOR } from './LedgerData'
import OrderDetail from './OrderDetail'

export async function paymentAdapterForMaterials({
  name,
  primaryAddress,
  vehicleNumber,
  driverName,
  phoneNumber,
  particularDetails,
  unit,
  amountPaid,
}) {
  const orderDetails = new OrderDetail(particularDetails, unit)
  const due = orderDetails.netBillingCost - amountPaid
  console.log('order details created', orderDetails)
  const userData = new CustomerDetail(
    name,
    due,
    primaryAddress,
    vehicleNumber,
    driverName,
    phoneNumber
  )
  const orderNames = [particularDetails.uniqueName]
  const orderIds = [particularDetails.id]
  const billingData = new BillingData(
    name,
    primaryAddress,
    vehicleNumber,
    orderDetails,
    orderNames,
    orderIds,
    phoneNumber,
    driverName,
    amountPaid,
    orderDetails.govtPrice,
    orderDetails.netGovtCost,
    orderDetails.govtCgstCost,
    orderDetails.govtSgstCost
  )
  await billingData.generateNumberedBillId()
  console.log('bill details created', billingData)
  const ledgerDataForMaterials = new LedgerData(
    amountPaid,
    PAYMENT_TYPE.CASH,
    PAID_FOR.MATERIALS,
    phoneNumber
  )
  const ledgerDataForCredit = new LedgerData(
    due,
    PAYMENT_TYPE.CREDIT,
    PAID_FOR.MATERIALS,
    phoneNumber
  )
  console.log('ledger data created', ledgerDataForMaterials)
  return {
    userData,
    orderDetails,
    billingData,
    ledgerDataForMaterials,
    ledgerDataForCredit,
  }
}

export function paymentAdapterForCustomer({
  name,
  primaryAddress,
  phoneNumber,
  typeOfPayment,
  paidFor,
  grandTotal,
}) {
  const userData = new CustomerDetail(name, 0, primaryAddress, '', '', phoneNumber)
  console.log('customer details created', userData)
  if (typeOfPayment === PAYMENT_TYPE.CASH) {
    userData.updateCurrentDue(-1 * grandTotal)
  } else {
    userData.updateCurrentDue(grandTotal)
  }
  const ledgerData = new LedgerData(grandTotal, typeOfPayment, paidFor, phoneNumber)
  console.log('ledger data created', ledgerData)
  return {
    userData,
    ledgerData,
  }
}
