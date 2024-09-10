import React, { useState } from 'react'
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';

const Header = () => {
    const [hideLeft, setHideLeft] = useState("-left-[1000px]");
    const menuItems = ["home", "Schedule Overview", "timetable", "faculty location", "contact"];

    const onOpen = () => {
        setHideLeft("left-0");
    }

    const onClose = () => {
        setHideLeft("-left-[1000px]");
    }

  return (
    <>
    <div className='max-[900px]:hidden'>
        <DesktopNav menuItems={menuItems}/>
    </div>
    <div className='min-[900px]:hidden'>
        <MobileNav menuItems={menuItems} onClose={onClose} onOpen={onOpen} hideLeft={hideLeft}/>
    </div>
    </>
  )
}

export default Header