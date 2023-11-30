import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import { useSelector } from 'react-redux'

import Layout from 'components/layout'
import AuthForm from 'components/auth-form'
import AuthSideContent from 'components/auth-side-content'

import stl from './index.module.scss'

const Auth = () => {
  const [className, setClassName] = useState('')
  const theme = useSelector((state: { theme: string }) => state.theme)

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
    <Layout theme={theme} title="Auth | Linkzar">
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
