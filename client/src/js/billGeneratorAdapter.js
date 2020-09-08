import CustomerDetail from './CustomerDetail'
import BillingData from './BillingData'
import LedgerData, { PAYMENT_TYPE, PAID_FOR } from './LedgerData'
import OrderDetail from './OrderDetail'

export function billGeneratorAdapterForCashMode({
  name,
  primaryAddress,
  vehicleNumber,
  driverName,
  phoneNumber,
  particularDetails,
  unit,
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
    PAYMENT_TYPE.CASH,
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
