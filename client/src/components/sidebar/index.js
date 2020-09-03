import React from 'react';
import './index.css';
import useToToggleClassName from '../../common-hoooks/use-toggle-class-name';

const Sidebar = ({ className }) => {
  return (
    <nav className={className}>
      <div className="flex-c center">
        <a href="" className="paper paper-raise-flatten btn">Billing</a>
        <a href="" className="paper paper-raise-flatten btn">Accounts</a>
        <a href="" className="paper paper-raise-flatten btn">Salary</a>
        <a href="" className="paper paper-raise-flatten btn">Staff details</a>
        <a href="" className="paper paper-raise-flatten btn">Customer details</a>
        <a href="" className="paper paper-raise-flatten btn">Receipt</a>
        <a href="" className="paper paper-raise-flatten btn">Database</a>
        <a href="" className="paper paper-raise-flatten btn">Print Invoice</a>
      </div>
    </nav>
  )
}

export default Sidebar;