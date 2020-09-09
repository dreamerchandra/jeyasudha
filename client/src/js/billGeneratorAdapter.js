import CustomerDetail from './CustomerDetail'
import BillingData from './BillingData'
import LedgerData, { PAYMENT_TYPE, PAID_FOR } from './LedgerData'
import OrderDetail from './OrderDetail'

export function paymentAdapterForMaterials({
  name,
  primaryAddress,
  vehicleNumber,
  driverName,
  phoneNumber,
  particularDetails,
  unit,
  typeOfPayment,
}) {
  const userData = new CustomerDetail(
    name,
    0,
    primaryAddress,
    vehicleNumber,
    driverName,
    phoneNumber
  )
  console.log('customer details created', userData)
  const orderDetails = new OrderDetail(particularDetails, unit)
  console.log('order details created', orderDetails)
  if (typeOfPayment === PAYMENT_TYPE.CREDIT) {
    userData.updateCurrentDue(orderDetails.total)
  }
  const billingData = new BillingData(
    name,
    primaryAddress,
    vehicleNumber,
    orderDetails,
    orderDetails.total,
    typeOfPayment
  )
  console.log('bill details created', billingData)
  const ledgerData = new LedgerData(
    orderDetails.total,
    billingData.grandTotal,
    typeOfPayment,
    PAID_FOR.MATERIALS
  )
  console.log('ledger data created', ledgerData)
  return {
    userData,
    orderDetails,
    billingData,
    ledgerData,
  }
}

export function paymentAdapterForCustomer({
  name,
  primaryAddress,
  phoneNumber,
  typeOfPayment,
  paidFor,
  amount,
}) {
  const userData = new CustomerDetail(name, 0, primaryAddress, '', '', phoneNumber)
  console.log('customer details created', userData)
  let billingData = null
  if (typeOfPayment === PAYMENT_TYPE.CASH) {
    userData.updateCurrentDue(-1 * amount)
    billingData = new BillingData(
      name,
      primaryAddress,
      '',
      null,
      amount,
      typeOfPayment
    )
    console.log('bill details created', billingData)
  } else {
    userData.updateCurrentDue(amount)
  }

  const ledgerData = new LedgerData(
    amount,
    BillingData.getGrandTotal(amount),
    typeOfPayment,
    paidFor
  )
  console.log('ledger data created', ledgerData)
  return {
    userData,
    billingData,
    ledgerData,
  }
}
