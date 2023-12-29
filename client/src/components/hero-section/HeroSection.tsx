import React, { useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import clsx from 'clsx'

import Button from 'components/button'

import ArrowIcon from 'assets/arrow-right.svg'
import TrackURLImage from 'assets/track-url-section.png'

import stl from './HeroSection.module.scss'

interface Props {
  theme: string
  heading: string
  desc: string
  btnLabel: string
  btnIcon: React.ReactNode
  imgSrc: string
  imgAlt: string
  background?: string
  swap: boolean
}

const HeroSection = ({
  theme,
  heading,
  desc,
  btnLabel,
  btnIcon,
  imgSrc,
  imgAlt,
  background,
  swap,
}: Props) => {
  const [className, setClassName] = React.useState('')
  const router = useRouter()

  useEffect(() => {
    if (theme === 'dark') setClassName(stl.darkHeroSec)
    else setClassName('')
  }, [theme])

  return (
    <section
      style={{ background }}
      className={clsx(stl.heroSec, swap ? stl.swap : '', className)}
    >
      <div className={stl.content}>
        <div className={stl.heading}>{heading}</div>
        <p className={stl.desc}>{desc}</p>
        <div className={stl.btnContainer}>
          <Button
            label={btnLabel}
            theme={theme}
            rightIcon={btnIcon}
            handleOnClick={() => router.push('/shorten')}
          />
        </div>
      </div>
      <div className={stl.img}>
        <Image src={imgSrc} alt={imgAlt} />
      </div>
    </section>
  )
}

HeroSection.defaultProps = {
  heading: 'Simplifying Your Links',
  desc: "Streamline your online experience with our link simplification tools. Shorten lengthy URLs into concise and shareable links that captivate your audience's attention. Customize these links with ease, personalize their destination, and gain valuable insights into their performance. Elevate engagement, enhance user experience, and optimize your digital strategy by simplifying your links with our powerful platform.",
  btnLabel: 'Get Started',
  btnIcon: <ArrowIcon />,
  imgSrc: TrackURLImage,
  imgAlt:
    'A man scrutinizes a graph on a monitor with the help of a magnifying glass.',
  swap: false,
}

export default HeroSection
