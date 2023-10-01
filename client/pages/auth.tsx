import React, { useEffect } from 'react'
import clsx from 'clsx'

import Layout from 'components/layout'
import AuthForm from 'components/auth-form'
import AuthSideContent from 'components/auth-side-content'

import stl from './index.module.scss'

const Auth = () => {
  const [className, setClassName] = React.useState('')
  const [theme, setTheme] = React.useState(() => {
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('theme')
      return storedTheme || 'light'
    }
    return 'light'
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', theme)
    }
  }, [theme])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (theme === 'dark') {
        setClassName(stl.darkAbout)
      } else {
        setClassName('')
      }
    }
  }, [theme])

  return (
    <Layout theme={theme} setTheme={setTheme} title="Auth">
      <div className={clsx(stl.about, className)}>
        <div className={stl.formContainer}>
          <AuthForm theme={theme} />
        </div>
        <AuthSideContent />
      </div>
    </Layout>
  )
}

export default Auth
