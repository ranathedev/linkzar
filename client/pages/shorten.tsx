import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

import auth from 'lib/firebase'
import Layout from 'components/layout'
import URLShortener from 'components/url-shortener'
import DemoContent from 'components/demo-content'
import LoadingScreen from 'components/loading-screen'

import stl from './index.module.scss'

const Shorten = () => {
  const [user, setUser] = useState({
    displayName: 'John Doe',
    photoURL: 'https://i.postimg.cc/Mp7gnttP/default-Pic.jpg',
  })
  const [isLoading, setIsLoading] = useState(true)
  const theme = useSelector((state: { theme: string }) => state.theme)
  const router = useRouter()

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)

    const mode = urlParams.get('mode')

    const unsubscribe = auth.onAuthStateChanged(user => {
      if (mode !== 'dev' && user) router.push('/dashboard')

      setTimeout(() => setIsLoading(false), 500)
    })

    return () => unsubscribe()
  }, [])

  useEffect(() => {
    const data = localStorage.getItem('user')
    //@ts-ignore
    const user = JSON.parse(data)
    setUser(user)
  }, [])

  const domainUrl = 'https://linkzar.fly.dev/'

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <Layout theme={theme} user={user} title="Shorten | Linkzar">
      <div className={stl.shorten}>
        <URLShortener
          domainUrl={domainUrl}
          isVisible={true}
          theme={theme}
          sendNewLink={() => {}}
          sendDeleteId={() => {}}
          uid="links"
          path="/shorten"
        />
        <DemoContent theme={theme} />
      </div>
    </Layout>
  )
}

export default Shorten
