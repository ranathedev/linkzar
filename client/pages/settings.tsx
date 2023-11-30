import React, { useEffect, useState } from 'react'
import firebase from 'firebase/auth'
import { useSelector } from 'react-redux'

import auth from 'lib/firebase'
import Layout from 'components/layout'
import AvatarHandler from 'components/avatar-handler'
import UserInfoSettings from 'components/user-info-settings'
import LoadingScreen from 'components/loading-screen'
import VerificationDialog from 'components/verification-dialog'

import stl from './index.module.scss'

const SettingsPage = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [isVerified, setIsVerified] = useState(false)
  const [user, setUser] = useState<firebase.User | {}>({
    fname: 'John',
    lname: 'Doe',
    email: 'johndoe@gmail.com',
    displayName: 'John Doe',
    photoURL: 'https://i.postimg.cc/Mp7gnttP/default-Pic.jpg',
  })
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

      setIsLoading(false)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  return isLoading ? (
    <LoadingScreen />
  ) : isVerified ? (
    <Layout theme={theme} user={user} title="Settings | Linkzar">
      <div className={stl.settings}>
        <div className={stl.container}>
          <AvatarHandler
            theme={theme}
            customClass={stl.avatarHandler}
            user={user}
            setUser={setUser}
          />
          <div className={stl.wrapper}>
            <UserInfoSettings theme={theme} user={user} setUser={setUser} />
          </div>
        </div>
      </div>
    </Layout>
  ) : (
    <Layout theme={theme} user={user} title="Verify | Linkzar">
      <div className={stl.verification}>
        <VerificationDialog theme={theme} user={user} />
      </div>
    </Layout>
  )
}

export default SettingsPage
