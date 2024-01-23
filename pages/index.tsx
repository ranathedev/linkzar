import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import Layout from 'components/layout'
import Homepage from 'components/homepage'

export default function Home() {
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
    <Layout theme={theme} user={user} title="URL Shortener | Linkzar">
      <Homepage theme={theme} />
    </Layout>
  )
}
