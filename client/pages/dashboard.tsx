import React, { useEffect, useState } from 'react'
import firebase from 'firebase/auth'
import { useSelector } from 'react-redux'

import auth from 'lib/firebase'
import Dashboard from 'components/dashboard'
import Layout from 'components/layout'
import LoadingScreen from 'components/loading-screen'
import VerificationDialog from 'components/verification-dialog'

import stl from './index.module.scss'

const DashboardPage = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<firebase.User | {}>({})
  const [isVerified, setIsVerified] = useState(true)
  const theme = useSelector((state: { theme: string }) => state.theme)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)

    const mode = urlParams.get('mode')

    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUser(user)
        localStorage.setItem('user', JSON.stringify(user))
        setIsVerified(user.emailVerified)
      }

      if (mode !== 'dev') {
        if (!user) {
          location.href = '/auth?type=signin'
        }
      }

      setTimeout(() => {
        setIsLoading(false)
      }, 1000)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  const domainUrl = 'https://linkzar.fly.dev/'

  return isLoading ? (
    <LoadingScreen />
  ) : isVerified ? (
    <Layout theme={theme} user={user} title="Dashboard | Linkzar">
      <Dashboard theme={theme} domainUrl={domainUrl} user={user} />
    </Layout>
  ) : (
    <Layout theme={theme} user={user} title="Verify | Linkzar">
      <div className={stl.verification}>
        <VerificationDialog theme={theme} user={user} />
      </div>
    </Layout>
  )
}

export default DashboardPage
