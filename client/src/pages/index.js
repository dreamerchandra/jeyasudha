import React from 'react'
import { Switch } from 'react-router-dom'
import PageFragment from '../fragments/page-fragment'
import RouteWithSubRoutes from '../components/router-with-sub-routes'
import routerConfig from '../js/routing-config'

const MainPage = () => {
  return (
    <PageFragment>
      <Switch>
        {routerConfig.map((route) => (
          <RouteWithSubRoutes key={route.path} {...route} />
        ))}
      </Switch>
    </PageFragment>
  )
}

export default MainPage
