import React from 'react'

import { PageProps } from 'lib/type'
import About from 'components/about'
import Layout from 'components/layout'

const AboutPage = ({ user, theme }: PageProps) => (
  <Layout theme={theme} user={user} title="About | Linkzar">
    <About theme={theme} />
  </Layout>
)

export default AboutPage
