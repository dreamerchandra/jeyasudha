import React from 'react';
import './index.css';
import useToToggleClassName from '../../common-hoooks/use-toggle-class-name';

const Menu = ({ className, onClick }) => {
  return (
    <div className={className} onClick={onClick}>
      <div className="menu">
        <div className="bar1"></div>
        <div className="bar2"></div>
        <div className="bar3"></div>
      </div>
    </div >
  )
}

export default Menu;