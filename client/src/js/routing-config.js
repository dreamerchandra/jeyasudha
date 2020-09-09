import Billing from '../fragments/billing'
import PriceUpdate from '../fragments/price-update'
import CustomerData from '../fragments/CustomerData'

const routerConfig = [
  {
    path: '/billing',
    component: Billing,
    linkName: 'BILLING',
  },
  {
    path: '/update-price',
    component: PriceUpdate,
    linkName: 'PRICE UPDATE',
  },
  {
    path: '/customer/data',
    component: CustomerData,
    linkName: 'CUSTOMER DATA',
  },
]

export default routerConfig
