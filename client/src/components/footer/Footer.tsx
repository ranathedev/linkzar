import React, { useEffect } from "react";
import Link from "next/link";
import clsx from "clsx";

import GithubIcon from "assets/github.svg";
import FacebookIcon from "assets/facebook.svg";
import LinkedInIcon from "assets/linkedin.svg";
import TwitterIcon from "assets/twitter.svg";
import InstaIcon from "assets/instagram.svg";

import stl from "./Footer.module.scss";

interface Props {
  theme: string;
  links: Array<{ icon: React.ReactNode; href: string }>;
}

const Footer = ({ theme, links }: Props) => {
  const [className, setClassName] = React.useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (theme === "dark") {
        setClassName(stl.darkFooter);
      } else {
        setClassName("");
      }
    }
  }, [theme]);

  return (
    <footer className={clsx(stl.footer, className)}>
      <Link href="/" className={stl.logo}>
        Linkzar
      </Link>
      <span className={stl.about}>
        Our URL shortener simplifies long web addresses, allowing you to create
        compact and memorable links. Shorten URLs effortlessly and enhance your
        online presence. With our user-friendly platform, you can optimize
        sharing, track link performance, and maximize engagement. Experience the
        power of concise, shareable links today.
      </span>
      <div className={stl.socials}>
        {links.map((item, i) => (
          <Link key={i} href={item.href} target="_blank">
            {item.icon}
          </Link>
        ))}
      </div>
      <span className={stl.copyright}>
        &copy; Linkzar&trade;. All Rights Reserved.
      </span>
    </footer>
  );
};

Footer.defaultProps = {
  links: [
    { icon: <GithubIcon />, href: "https://github.com/ranaintizar" },
    { icon: <FacebookIcon />, href: "https://www.facebook.com/ranathedev" },
    { icon: <LinkedInIcon />, href: "https://linkedin.com/in/ranathedev" },
    { icon: <TwitterIcon />, href: "https://twitter.com/ranathedev" },
    { icon: <InstaIcon />, href: "https://instagram.com/ranathedev" },
  ],
};

export default Footer;
