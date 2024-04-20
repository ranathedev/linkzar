import React from 'react'
import { useRouter } from 'next/router'

import { PageProps } from 'lib/type'
import Layout from 'components/layout'
import URLShortener from 'components/url-shortener'
import DemoContent from 'components/demo-content'
import LoadingScreen from 'components/loading-screen'

import stl from './index.module.scss'

const Shorten = ({ user, isLoading, theme }: PageProps) => {
  const router = useRouter()

  const urlParams = new URLSearchParams(window.location.search)

  const mode = urlParams.get('mode')

  if (mode !== 'dev' && user) router.push('/dashboard')

  const domainUrl = process.env.DOMAIN_URL

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <Layout theme={theme} user={user} title="Shorten | Linkzar">
      <div className={stl.shorten}>
        <URLShortener
          domainUrl={domainUrl as string}
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
