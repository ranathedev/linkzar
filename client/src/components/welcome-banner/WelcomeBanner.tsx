import React, { useEffect } from "react";
import Image from "next/image";
import clsx from "clsx";

import Button from "components/button";

import AnalyticsTrackingImg from "assets/track-links.png";

import stl from "./WelcomeBanner.module.scss";

interface Props {
  theme: string;
}

const WelcomeBanner = ({ theme }: Props) => {
  const [className, setClassName] = React.useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (theme === "dark") {
        setClassName(stl.darkWelcomeBanner);
      } else {
        setClassName("");
      }
    }
  }, [theme]);

  return (
    <div className={clsx(stl.welcomeBanner, className)}>
      <div className={stl.content}>
        <h2 className={stl.heading}>Hello, Rana!</h2>
        <p className={stl.desc}>
          Welcome to your Dashboard! Here you can manage and track your links.
        </p>
        <div className={stl.btn}>
          <Button theme="light" label="Shorten Link" />
        </div>
      </div>
      <Image src={AnalyticsTrackingImg} alt="welcome-banner image" />
    </div>
  );
};

export default WelcomeBanner;
