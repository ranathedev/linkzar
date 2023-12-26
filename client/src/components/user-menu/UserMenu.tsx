import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'
import { setTheme } from '@/src/store'
import { useDispatch } from 'react-redux'

import { logOut } from 'lib/authFunctions'
import useOnClickOutside from 'lib/useClickOutside'
import ToggleThemeBtn from 'components/toggle-theme-btn'
import Toast from 'components/toast'

import DropdownIcon from 'assets/chevron-down.svg'
import LogoutIcon from 'assets/logout.svg'
import SettingsIcon from 'assets/settings.svg'
import DashboardIcon from 'assets/dashboard-2.svg'

import stl from './UserMenu.module.scss'

interface Props {
  user: any
  theme: string
}

const UserMenu = ({ user, theme }: Props) => {
  const [className, setClassName] = useState('')
  const [expand, setExpand] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastOpts, setToastOpts] = useState({ variant: '', msg: '' })
  const dispatch = useDispatch()

  const ref = useRef(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (theme === 'dark') {
        setClassName(stl.darkUserMenu)
      } else {
        setClassName('')
      }
    }
  }, [theme])

  useOnClickOutside(() => setExpand(false), ref)

  const handleThemeChange = () => {
    if (theme === 'light') dispatch(setTheme('dark'))
    else dispatch(setTheme('light'))
  }

  return (
    <>
      <Toast
        theme={theme}
        isVisible={showToast}
        variant={toastOpts.variant}
        content={toastOpts.msg}
        setShowToast={setShowToast}
      />
      <div ref={ref} className={clsx(stl.userMenu, className)}>
        <div className={stl.content} onClick={() => setExpand(!expand)}>
          <Image
            src={
              (user.photoURL && user.photoURL) ||
              'https://i.postimg.cc/Mp7gnttP/default-Pic.jpg'
            }
            width={36}
            height={36}
            alt="user-avatar"
          />
          <span className={clsx(stl.icon, expand ? stl.rotate : '')}>
            <DropdownIcon />
          </span>
          <span className={stl.name}>
            {(user.displayName && user.displayName) || 'John Doe'}
          </span>
        </div>
        <div className={clsx(stl.menu, expand ? stl.show : '')}>
          <div className={stl.theme} onClick={handleThemeChange}>
            <span>Theme</span>
            <ToggleThemeBtn customClass={stl.toggleBtn} theme={theme} />
          </div>
          <Link
            href="/settings"
            className={stl.settings}
            onClick={() => setExpand(false)}
          >
            <span>Settings</span>
            <SettingsIcon />
          </Link>
          <Link
            href="/dashboard"
            className={stl.dashboard}
            onClick={() => setExpand(false)}
          >
            <span>Dashboard</span>
            <DashboardIcon />
          </Link>
          <hr />
          <div
            className={stl.logout}
            onClick={() => {
              logOut(setShowToast, setToastOpts)
              setExpand(false)
            }}
          >
            <span>Logout</span>
            <LogoutIcon />
          </div>
        </div>
      </div>
    </>
  )
}

export default UserMenu
