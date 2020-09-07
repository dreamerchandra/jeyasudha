import Billing from "../fragments/billing";
import PriceUpdate from "../fragments/price-update";

const routerConfig = [
  {
    path: "/billing",
    component: Billing,
    linkName: 'BILLING',
  },
  {
    path: "/update-price",
    component: PriceUpdate,
    linkName: 'PRICE UPDATE'
  }
]

export default routerConfig;