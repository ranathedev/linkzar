import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import firebase from 'firebase/auth'

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
  const router = useRouter()

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)

    const mode = urlParams.get('mode')

    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUser(user)
        localStorage.setItem('user', JSON.stringify(user))
        setIsVerified(user.emailVerified)
      }

      if (mode !== 'dev' && !user) router.push('/auth?type=signin')

      setTimeout(() => setIsLoading(false), 1000)
    })

    return () => unsubscribe()
  }, [])

  const domainUrl = 'https://linkzar.fly.dev/'

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <Layout
      theme={theme}
      user={user}
      title={isVerified ? 'Dashboard' : 'Verify' + ' | Linkzar'}
    >
      {isVerified ? (
        <Dashboard theme={theme} domainUrl={domainUrl} user={user} />
      ) : (
        <div className={stl.verification}>
          <VerificationDialog theme={theme} user={user} />
        </div>
      )}
    </Layout>
  )
}

export default DashboardPage
