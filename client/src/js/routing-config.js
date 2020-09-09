import Billing from '../fragments/billing'
import PriceUpdate from '../fragments/price-update'
import CustomerData from '../fragments/customer-data'
import Receipt from '../fragments/receipt'

const routerConfig = [
  {
    path: '/billing',
    component: Billing,
    linkName: 'BILLING',
  },
  {
    path: '/product',
    component: PriceUpdate,
    linkName: 'PRICE UPDATE',
  },
  {
    path: '/due',
    component: CustomerData,
    linkName: 'CUSTOMER DATA',
  },
  {
    path: '/receipt',
    component: Receipt,
    linkName: 'RECEIPT',
  },
]

export default routerConfig
