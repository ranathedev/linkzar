import React, { useEffect } from 'react'
import clsx from 'clsx'

import Button from 'components/button'

import ArrowIcon from 'assets/arrow-right.svg'

import stl from './CTA.module.scss'

interface Props {
  theme: string
}

const CTA = ({ theme }: Props) => {
  const [className, setClassName] = React.useState('')

  useEffect(() => {
    if (theme === 'dark') setClassName(stl.darkCTA)
    else setClassName('')
  }, [theme])

  return (
    <section className={clsx(stl.cta, className)}>
      <div className={stl.container}>
        <div className={stl.content}>
          <h2 className={stl.heading}>Short Links, Big Impact!</h2>
          <p className={stl.desc}>
            Optimize sharing with our user-friendly web app for shortened URLs.
          </p>
          <Button
            theme={theme}
            label="Get Started"
            rightIcon={<ArrowIcon />}
            handleOnClick={() => (location.href = '/dashboard')}
          />
        </div>
      </div>
    </section>
  )
}

export default CTA
