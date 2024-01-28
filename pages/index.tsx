import React from 'react'

import { PageProps } from 'lib/type'
import Layout from 'components/layout'
import Homepage from 'components/homepage'

export default function Home({ user, theme }: PageProps) {
  return (
    <Layout theme={theme} user={user} title="URL Shortener | Linkzar">
      <Homepage theme={theme} />
    </Layout>
  )
}
