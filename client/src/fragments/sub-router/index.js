import React from 'react'
import { NavLink } from 'react-router-dom'
import MainComponentHolder from '../../components/main-component-holder'

export default function SubRouter({ subRoutes }) {
  return (
    <>
      <MainComponentHolder>
        <div className="main">
          {subRoutes.map((router) => (
            <NavLink
              to={router.path}
              className="paper paper-raise-flatten btn"
              activeClassName="disabled-btn"
              key={router.path}
            >
              {router.linkName}
            </NavLink>
          ))}
        </div>
      </MainComponentHolder>
    </>
  )
}
