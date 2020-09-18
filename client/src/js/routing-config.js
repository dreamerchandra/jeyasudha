import Billing from '../fragments/billing'
import PriceUpdate from '../fragments/price-update'
import CustomerData from '../fragments/customer-data'
import Receipt from '../fragments/receipt'
import CustomerDb from '../fragments/CustomerDb'
import Accounts from '../fragments/account'

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
  {
    path: '/db/customer',
    component: CustomerDb,
    linkName: 'CUSTOMER DB',
  },
  {
    path: '/account',
    component: Accounts,
    linkName: 'ACCOUNTS',
  },
]

export default routerConfig
