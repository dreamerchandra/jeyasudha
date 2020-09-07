import React from 'react';
import PageFragment from '../fragments/page-fragment';
import { Switch } from 'react-router-dom';
import RouteWithSubRoutes from '../components/router-with-sub-routes';
import routerConfig from '../js/routing-config';


const MainPage = () => {
  return (
    <PageFragment>
      <Switch>
        {routerConfig.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}
      </Switch>
    </PageFragment>
  )
}


export default MainPage;
