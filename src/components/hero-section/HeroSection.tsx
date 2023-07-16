import React, { useEffect } from "react";
import Image from "next/image";
import clsx from "clsx";

import Button from "components/button";

import ArrowIcon from "assets/arrow-right.svg";
import TrackURLImage from "assets/track-url-section.png";

import stl from "./HeroSection.module.scss";

interface Props {
  theme: string;
  heading: string;
  desc: string;
  btnLabel: string;
  btnOnClick: () => void;
  btnIcon: React.ReactNode;
  src: any;
  background?: string;
  swap: Boolean;
}

const HeroSection = ({
  theme,
  heading,
  desc,
  btnLabel,
  btnOnClick,
  btnIcon,
  src,
  background,
  swap,
}: Props) => {
  const [className, setClassName] = React.useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (theme === "dark") {
        setClassName(stl.darkHeroSec);
      } else {
        setClassName("");
      }
    }
  }, [theme]);

  return (
    <section
      style={{ background }}
      className={clsx(stl.heroSec, swap ? stl.swap : "", className)}
    >
      <div className={stl.content}>
        <div className={stl.heading}>{heading}</div>
        <p className={stl.desc}>{desc}</p>
        <div className={stl.btnContainer}>
          <Button
            label={btnLabel}
            theme={theme}
            icon={btnIcon}
            handleOnClick={btnOnClick}
          />
        </div>
      </div>
      <div className={stl.img}>
        <Image src={src} alt="short-url-image" />
      </div>
    </section>
  );
};

HeroSection.defaultProps = {
  heading: "Shorten Long URLs Effortlessly",
  desc: "Say goodbye to long, clunky URLs and hello to simple and shareable links. Our friendly URL shortening platform makes it a breeze to transform lengthy web addresses into compact, easy-to-remember links. Whether you're sharing on social media, sending emails, or engaging with your audience, our user-friendly solution ensures that your links are streamlined and professional. Start shortening URLs effortlessly and share with confidence today!",
  btnLabel: "Get Started",
  btnOnClick: () => console.log("Hero Section Button Clicked..."),
  btnIcon: <ArrowIcon />,
  src: TrackURLImage,
  swap: false,
};

export default HeroSection;
