import React from 'react'
import { useRouter } from 'next/router'

import { PageProps } from 'lib/type'
import Dashboard from 'components/dashboard'
import Layout from 'components/layout'
import LoadingScreen from 'components/loading-screen'
import VerificationDialog from 'components/verification-dialog'

import stl from './index.module.scss'

const DashboardPage = ({ user, isLoading, theme }: PageProps) => {
  const router = useRouter()

  const urlParams = new URLSearchParams(window.location.search)

  const mode = urlParams.get('mode')

  if (!isLoading && mode !== 'dev' && !user) router.push('/auth?type=signin')

  const domainUrl = process.env.DOMAIN_URL

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <Layout
      theme={theme}
      user={user}
      title={user?.emailVerified ? 'Dashboard' : 'Verify' + ' | Linkzar'}
    >
      {user && !user.emailVerified ? (
        <div className={stl.verification}>
          <VerificationDialog theme={theme} user={user} />
        </div>
      ) : (
        <Dashboard theme={theme} domainUrl={domainUrl as string} user={user} />
      )}
    </Layout>
  )
}

export default DashboardPage
