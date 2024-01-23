import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import About from 'components/about'
import Layout from 'components/layout'

const AboutPage = () => {
  const [user, setUser] = useState({
    displayName: 'John Doe',
    photoURL: 'https://i.postimg.cc/Mp7gnttP/default-Pic.jpg',
  })
  const theme = useSelector((state: { theme: string }) => state.theme)

  useEffect(() => {
    const data = localStorage.getItem('user')
    //@ts-ignore
    const user = JSON.parse(data)
    setUser(user)
  }, [])

  return (
    <Layout theme={theme} user={user} title="About | Linkzar">
      <About theme={theme} />
    </Layout>
  )
}

export default AboutPage
