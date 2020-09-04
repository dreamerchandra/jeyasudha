import React, { useState } from 'react'
import Sidebar from '../../components/sidebar'
import Menu from '../../components/menu'
import useToggle from '../../common-hoooks/use-toggle';
import cx from 'classnames';

const useStyle = () => {
  const [className, setClassName] = useState({ menuCx: 'menu-container', sideBarCx: 'nav' })

  const onToggle = (isOpened) => {
    setClassName(() => {
      const menu = cx('menu-container', {
        'close': isOpened,
      })
      const sideBar = cx('nav', {
        'open': isOpened
      })
      return { menuCx: menu, sideBarCx: sideBar }
    })
  }

  const { toggler } = useToggle({ onToggle });
  return { className, toggler };
}

const NavBar = () => {
  const { className, toggler } = useStyle();
  return (
    <>
      <Menu className={className.menuCx} onClick={toggler} />
      <Sidebar className={className.sideBarCx} onClick={toggler} />
    </>
  )
}

export default NavBar;