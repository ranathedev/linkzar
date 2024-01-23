import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import clsx from 'clsx'

import auth from 'lib/firebase'
import Layout from 'components/layout'
import AuthForm from 'components/auth-form'
import AuthSideContent from 'components/auth-side-content'
import LoadingScreen from 'components/loading-screen'

import stl from './index.module.scss'

const Auth = () => {
  const [className, setClassName] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const theme = useSelector((state: { theme: string }) => state.theme)
  const router = useRouter()

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)

    const mode = urlParams.get('mode')

    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user && mode !== 'dev') router.push('/dashboard')

      setTimeout(() => setIsLoading(false), 500)
    })

    return () => unsubscribe()
  }, [])

  useEffect(() => {
    theme === 'dark' ? setClassName(stl.darkAbout) : setClassName('')
  }, [theme])

  return isLoading ? (
    <LoadingScreen />
  ) : (
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
