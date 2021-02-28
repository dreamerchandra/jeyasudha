import React, { useEffect } from 'react'
import './index.css'
import { NavLink } from 'react-router-dom'
import routerConfig from '../../js/routing-config'
import { logout } from '../../js/firebase-auth'
import { useRole } from '../../common-hoooks/use-role'
import { ROLE } from '../../js/user-role'

const Sidebar = ({ className, onClick }) => {
  const role = useRole()
  useEffect(() => {
    if (role !== ROLE.OWNER) {
      const update = document.getElementById('priceUpdate')
      update.classList.add('hide')
    } else {
      const update = document.getElementById('priceUpdate')
      update.classList.remove('hide')
    }
  }, [role])
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
                id={router.id}
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
