import React from 'react'
import { Route } from 'react-router-dom'

export default function RouteWithSubRoutes(route) {
  return (
    <Route path={route.path} key={route.path}>
      <route.component />
    </Route>
  )
}
