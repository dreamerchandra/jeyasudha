import CustomerDetail from './CustomerDetail'
import BillingData from './BillingData'
import LedgerData, { PAYMENT_TYPE, PAID_FOR } from './LedgerData'
import OrderDetail from './OrderDetail'

export function paymentAdapterForCashMode({
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
    orderDetails.total
  )
  console.log('bill details created', billingData)
  const ledgerData = new LedgerData(
    orderDetails.total,
    billingData.netTotal,
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
