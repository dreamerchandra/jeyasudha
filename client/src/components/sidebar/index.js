import React from 'react'
import './index.css'
import { NavLink } from 'react-router-dom'
import routerConfig from '../../js/routing-config'
import { logout } from '../../js/firebase-auth'

const Sidebar = ({ className, onClick }) => {
  return (
    <nav className={className}>
      <div className="flex-c center">
        {routerConfig.map(
          (router) =>
            !router.hideFromNav && (
              <NavLink
                to={router.path}
                className="paper paper-raise-flatten btn"
                onClick={onClick}
                activeClassName="disabled-btn"
                key={router.path}
              >
                {router.linkName}
              </NavLink>
            )
        )}
        <NavLink
          to="/logout"
          className="paper paper-raise-flatten btn"
          onClick={logout}
          activeClassName="disabled-btn"
          key="logout"
        >
          Logout
        </NavLink>
      </div>
    </nav>
  )
}

export default Sidebar
