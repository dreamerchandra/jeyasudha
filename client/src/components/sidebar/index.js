import React from 'react'
import './index.css'
import { NavLink } from 'react-router-dom'
import routerConfig from '../../js/routing-config'

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
        {/* <NavLink to='/receipt' className="paper paper-raise-flatten btn" onClick={onClick} activeClassName='disabled-btn'>Receipt</NavLink>
        <NavLink to='/customer' className="paper paper-raise-flatten btn" onClick={onClick} activeClassName='disabled-btn'>Customer details</NavLink>
        <NavLink to='/update-price' className="paper paper-raise-flatten btn" onClick={onClick} activeClassName='disabled-btn'>Price Update</NavLink>
        <NavLink to='/accounts' className="paper paper-raise-flatten btn" onClick={onClick} activeClassName='disabled-btn'>Accounts</NavLink>
        <NavLink to='/salary' className="paper paper-raise-flatten btn" onClick={onClick} activeClassName='disabled-btn'>Salary</NavLink>
        <NavLink to='/staff' className="paper paper-raise-flatten btn" onClick={onClick} activeClassName='disabled-btn'>Staff details</NavLink>
        <NavLink to='/db' className="paper paper-raise-flatten btn" onClick={onClick} activeClassName='disabled-btn'>Database</NavLink> */}
      </div>
    </nav>
  )
}

export default Sidebar
