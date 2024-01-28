import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import clsx from 'clsx'

import { PageProps } from 'lib/type'
import Layout from 'components/layout'
import AuthForm from 'components/auth-form'
import AuthSideContent from 'components/auth-side-content'
import LoadingScreen from 'components/loading-screen'

import stl from './index.module.scss'

const Auth = ({ user, isLoading, theme }: PageProps) => {
  const [className, setClassName] = useState('')
  const router = useRouter()

  const urlParams = new URLSearchParams(window.location.search)

  const mode = urlParams.get('mode')

  if (user && mode !== 'dev') router.push('/dashboard')

  useEffect(() => {
    theme === 'dark' ? setClassName(stl.darkAbout) : setClassName('')
  }, [theme])

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <Layout theme={theme} user={user} title="Auth | Linkzar">
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
