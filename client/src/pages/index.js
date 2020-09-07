import React from 'react';
import Billing from '../fragments/billing';
import PageFragment from '../fragments/page-fragment';
import { Switch } from 'react-router-dom';
import RouteWithSubRoutes from '../components/router-with-sub-routes';
import PriceUpdate from '../fragments/price-update';


const routesConfig = [
  {
    path: "/billing",
    component: Billing
  },
  {
    path: "/update-price",
    component: PriceUpdate
  }
]

const MainPage = () => {
  return (
    <PageFragment>
      <Switch>
        {routesConfig.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}
      </Switch>
    </PageFragment>
  )
}


export default MainPage;
