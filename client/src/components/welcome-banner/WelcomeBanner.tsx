import React from "react";
import Image from "next/image";

import Button from "components/button";

import AnalyticsTrackingImg from "assets/track-links.png";

import stl from "./WelcomeBanner.module.scss";

const WelcomeBanner = () => {
  return (
    <div className={stl.welcomeBanner}>
      <div className={stl.content}>
        <h2 className={stl.heading}>Hello, Rana!</h2>
        <p className={stl.desc}>
          Simplify your links and track their performance.
        </p>
        <Button theme="light" label="Shorten Link" />
      </div>
      <Image src={AnalyticsTrackingImg} alt="welcome-banner image" />
    </div>
  );
};

export default WelcomeBanner;
