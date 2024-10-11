import React, { useEffect } from "react"
import Link from "next/link"
import clsx from "clsx"

import GithubIcon from "assets/github.svg"
import FacebookIcon from "assets/facebook.svg"
import LinkedInIcon from "assets/linkedin.svg"
import TwitterIcon from "assets/twitter.svg"

import stl from "./Footer.module.scss"

interface Props {
  theme: string
}

const Footer = ({ theme }: Props) => {
  const [className, setClassName] = React.useState("")

  useEffect(() => {
    theme === "dark" ? setClassName(stl.darkFooter) : setClassName("")
  }, [theme])

  const links = [
    {
      id: "github-profile-link",
      icon: <GithubIcon />,
      href: "https://github.com/ranathedev/linkzar",
      ariaLabel: "Visit my Github Profile",
    },
    {
      id: "facebook-profile-link",
      icon: <FacebookIcon />,
      href: "https://www.facebook.com/linkzar.web",
      ariaLabel: "Visit my Facebook Profile",
    },
    {
      id: "linkedin-profile-link",
      icon: <LinkedInIcon />,
      href: "https://www.linkedin.com/company/linkzar",
      ariaLabel: "Visit my Linkedin Profile",
    },
    {
      id: "twitter-profile-link",
      icon: <TwitterIcon />,
      href: "https://twitter.com/linkzar_web",
      ariaLabel: "Visit my Twitter Profile",
    },
  ]

  return (
    <footer className={clsx(stl.footer, className)}>
      <Link href="/?mode=dev" className={stl.logo}>
        Linkzar
      </Link>
      <span className={stl.about}>
        Our URL shortener simplifies long web addresses, allowing you to create
        compact and memorable links. Shorten URLs effortlessly and enhance your
        online presence. With our user-friendly platform, you can optimize
        sharing, track link performance, and maximize engagement. Experience the
        power of concise, shareable links today.
        <Link href="https://forms.gle/4eCrPMLiLR9pUPnP9" target="_blank">
          {" "}
          Contact Support
        </Link>
      </span>
      <div className={stl.socials}>
        {links.map(item => (
          <Link
            key={item.id}
            href={item.href}
            target="_blank"
            aria-label={item.ariaLabel}
          >
            {item.icon}
          </Link>
        ))}
      </div>
      <span className={stl.copyright}>
        &copy; Linkzar&trade;. All Rights Reserved.
      </span>
    </footer>
  )
}

export default Footer
