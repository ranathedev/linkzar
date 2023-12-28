import React, { useEffect } from 'react'
import Image from 'next/image'
import clsx from 'clsx'

import AnalyticsTrackingImg from 'assets/track-links.png'

import stl from './WelcomeBanner.module.scss'

interface Props {
  theme: string
  name: string
}

const WelcomeBanner = ({ theme, name }: Props) => {
  const [className, setClassName] = React.useState('')

  useEffect(() => {
    if (theme === 'dark') setClassName(stl.darkWelcomeBanner)
    else setClassName('')
  }, [theme])

  return (
    <div className={clsx(stl.welcomeBanner, className)}>
      <div className={stl.content}>
        <h2 className={stl.heading}>Hello, {(name && name) || 'John Doe'}!</h2>
        <p className={stl.desc}>
          Welcome to your Dashboard! Here you can manage and track your links.
        </p>
      </div>
      <Image
        src={AnalyticsTrackingImg}
        alt="A focused man working at a desk with a laptop and a chain, engrossed in his work."
      />
    </div>
  )
}

export default WelcomeBanner
