import Billing from '../fragments/billing'
import PriceUpdate from '../fragments/price-update'
import CustomerData from '../fragments/customer-data'
import Receipt from '../fragments/receipt'
import CustomerDb from '../fragments/customer-db'
import AccountDb from '../fragments/account-db'
import Accounts from '../fragments/account'
import DBRouter from '../fragments/db-router'
import ProductDb from '../fragments/product-db'
import BillingDb from '../fragments/billing-db'
import StaffUpdate from '../fragments/staff-update'
import Attendance from '../fragments/attendance'
import StaffRouter from '../fragments/staff-router'
import StaffLoan from '../fragments/staff-loan'

const dbSubRoutes = [
  {
    path: '/db/customer',
    component: CustomerDb,
    linkName: 'CUSTOMER DB',
    hideFromNav: true,
  },
  {
    path: '/db/account',
    component: AccountDb,
    linkName: 'ACCOUNTS DB',
    hideFromNav: true,
  },
  {
    path: '/db/product',
    component: ProductDb,
    linkName: 'PRODUCT DB',
    hideFromNav: true,
  },
  {
    path: '/db/billing',
    component: BillingDb,
    linkName: 'BILLING DB',
    hideFromNav: true,
  },
]

const staffSubRoutes = [
  {
    path: '/staff/update',
    component: StaffUpdate,
    linkName: 'STAFF UPDATE',
    hideFromNav: true,
  },
  {
    path: '/staff/loan',
    component: StaffLoan,
    linkName: 'STAFF LOAN',
    hideFromNav: true,
  },
  {
    path: '/staff/salary',
    component: DBRouter,
    linkName: 'STAFF SALARY',
    hideFromNav: true,
  },
  {
    path: '/staff/attendance',
    component: Attendance,
    linkName: 'ATTENDANCE',
    hideFromNav: true,
  },
]

const routerConfig = [
  ...dbSubRoutes,
  ...staffSubRoutes,
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
    path: '/account',
    component: Accounts,
    linkName: 'ACCOUNTS',
  },
  {
    path: '/staff',
    component: StaffRouter,
    linkName: 'STAFF',
    subRoutes: staffSubRoutes,
  },
  {
    path: '/db',
    component: DBRouter,
    linkName: 'DB',
    subRoutes: dbSubRoutes,
  },
]
export default routerConfig
