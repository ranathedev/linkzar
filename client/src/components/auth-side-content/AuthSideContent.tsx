import React from 'react'
import Link from 'next/link'

import Logo from 'assets/logo.svg'
import ArrowRightIcon from 'assets/arrow-right.svg'

import stl from './AuthSideContent.module.scss'

const AuthSideContent = () => (
  <div className={stl.authSideContent}>
    <div className={stl.container}>
      <div className={stl.logoContainer}>
        <Logo />
        <h1 className={stl.logoText}>Linkzar</h1>
      </div>
      <h1 className={stl.headline}>
        Unlock the Power of Effective Link Management
      </h1>
      <p className={stl.subHeadline}>
        Elevate your link management game with our advanced tools. Shorten,
        customize, and optimize URLs while gaining insights into user behavior.
        Craft compelling calls-to-action, monitor engagement, and refine your
        strategy. Transform clicks into connections.
      </p>
      <Link href="/shorten">
        Try Demo <ArrowRightIcon />
      </Link>
    </div>
  </div>
)

export default AuthSideContent
