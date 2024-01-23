import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import clsx from 'clsx'

import useOnClickOutside from 'lib/useClickOutside'

import Logo from '@/public/favicon.ico'
import SidebarCollapseIcon from 'assets/sidebar-collapse.svg'
import SidebarExpandIcon from 'assets/sidebar-expand.svg'
import DashboardIcon from 'assets/dashboard.svg'
import MoreIcon from 'assets/more-icon.svg'

import stl from './Sidebar.module.scss'

interface Props {
  theme: string
  list: Array<{ icon: React.ReactNode; title: string }>
}

const Sidebar = ({ theme, list }: Props) => {
  const [className, setClassName] = useState('')
  const [collapse, setCollapse] = useState(true)

  useEffect(() => {
    theme === 'dark' ? setClassName(stl.darkSidebar) : setClassName('')
  }, [theme])

  const ref = useRef(null)

  useOnClickOutside(() => setCollapse(true), ref)

  return (
    <div
      ref={ref}
      className={clsx(stl.sidebar, className, collapse ? stl.collapse : '')}
    >
      <div className={stl.container}>
        <div className={stl.header}>
          <div className={stl.logo}>
            <Image src={Logo} alt="linkzar-logo" />
          </div>
          <button
            className={stl.sidebarBtn}
            onClick={() => setCollapse(!collapse)}
          >
            {collapse ? <SidebarCollapseIcon /> : <SidebarExpandIcon />}
          </button>
        </div>
        <div className={stl.divider} />
        <ul className={stl.list}>
          {list.map((item, i) => (
            <li key={i}>
              <span className={stl.icon}>{item.icon}</span>
              <span className={stl.title}>{item.title}</span>
            </li>
          ))}
        </ul>
        <div className={stl.divider} />
      </div>
      <div className={stl.account}>
        <div className={stl.left}>
          <div className={stl.img}>
            <Image
              src="https://i.postimg.cc/Mp7gnttP/default-Pic.jpg"
              width={40}
              height={40}
              alt="profile-avatar"
            />
          </div>
          <span className={stl.name}>John Doe</span>
        </div>
        <button className={stl.moreBtn}>
          <MoreIcon />
        </button>
      </div>
    </div>
  )
}

Sidebar.defaultProps = {
  list: [
    { icon: <DashboardIcon />, title: 'Dashboard' },
    { icon: <DashboardIcon />, title: 'Dashboard' },
    { icon: <DashboardIcon />, title: 'Dashboard' },
    { icon: <DashboardIcon />, title: 'Dashboard' },
    { icon: <DashboardIcon />, title: 'Dashboard' },
  ],
}

export default Sidebar
