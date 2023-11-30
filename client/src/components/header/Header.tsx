import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import clsx from 'clsx'

import UserMenu from 'components/user-menu'
import ToggleThemeBtn from 'components/toggle-theme-btn'

import stl from './Header.module.scss'

interface Props {
  theme: string
  user: any
}

const Header = ({ theme, user }: Props) => {
  const [expand, setIsExpand] = useState(false)
  const [width, setWidth] = useState(500)
  const [className, setClassName] = useState('')
  const [path, setPath] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (theme === 'dark') {
        setClassName(stl.darkHeader)
      } else {
        setClassName('')
      }
    }
  }, [theme])

  const links = [
    { name: 'Home', href: '/' },
    user
      ? { name: 'Dashboard', href: '/dashboard' }
      : { name: 'Shorten URL', href: '/shorten' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ]

  useEffect(() => {
    const btn = document.getElementById('btn')
    expand ? btn?.classList.add(stl.active) : btn?.classList.add(stl.noActive)
    expand
      ? btn?.classList.remove(stl.notActive)
      : btn?.classList.remove(stl.active)
  }, [expand])

  useEffect(() => {
    width > 640 && setIsExpand(false)
  }, [width])

  useEffect(() => {
    const path = location.pathname

    setPath(path)

    function measureWidth() {
      setWidth(document.body.clientWidth)
    }
    measureWidth()
    window.addEventListener('resize', measureWidth)
    return () => window.removeEventListener('resize', measureWidth)
  }, [])

  return (
    <header
      style={expand ? { height: `${5.3 + links.length * 2}rem` } : {}}
      className={clsx(stl.header, className)}
    >
      <div className={stl.container}>
        <Link href="/" className={stl.logo}>
          Linkzar
        </Link>
        <div className={stl.menu}>
          {links.map((item, i: number) => (
            <Link
              key={i}
              href={item.href}
              className={path === item.href ? stl.active : ''}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className={stl.right}>
          {user ? (
            <UserMenu theme={theme} user={user} />
          ) : (
            <>
              <ToggleThemeBtn customClass={stl.toggleBtn} theme={theme} />
              {path === '/auth' ? undefined : (
                <Link href="/auth?type=signup" className={stl.signupBtn}>
                  Sign Up
                </Link>
              )}
            </>
          )}
          <button
            id="btn"
            onClick={() => setIsExpand(!expand)}
            aria-label="Navigation"
            className={stl.expandBtn}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
      <ul
        style={expand ? { transform: 'scaleY(1)' } : { transform: 'scaleY(0)' }}
        className={stl.list}
      >
        {links.map((item, i) => (
          <li key={i}>
            <Link
              href={item.href}
              className={path === item.href ? stl.active : ''}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </header>
  )
}

export default Header
