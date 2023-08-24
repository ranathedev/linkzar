import React, { useEffect } from "react";
import Image from "next/image";
import clsx from "clsx";

import Button from "components/button";

import Img from "assets/url-shortener.png";
import ArrowIcon from "assets/arrow-right.svg";

import stl from "./Intro.module.scss";

interface Props {
  theme: string;
  customClass?: string;
}

const Intro = ({ theme, customClass }: Props) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [className, setClassName] = React.useState("");
  const texts = [
    "Simplifying Your Links",
    "Amplifying Your Reach",
    "Optimizing Your Sharing",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [texts.length]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (theme === "dark") {
        setClassName(stl.darkIntro);
      } else {
        setClassName("");
      }
    }
  }, [theme]);

  return (
    <section className={clsx(stl.intro, className, customClass)}>
      <div className={stl.container}>
        <div className={stl.content}>
          <h1 className={stl.heading}>
            Explore Our Advanced URL Shortener App,
            <div className={stl.featureTransition}>
              {texts.map((text, index) => (
                <span
                  key={index}
                  className={clsx(
                    stl.text,
                    `${index === currentIndex ? stl.current : ""}`
                  )}
                >
                  {text}
                </span>
              ))}
            </div>
          </h1>
          <p className={stl.desc}>
            Elevate Your Online Experience: Making Link Management Smarter and
            More Insightful Than Ever Before.
          </p>
          <div className={stl.btnContainer}>
            <Button
              label="Get Started"
              theme={theme}
              rightIcon={<ArrowIcon />}
              handleOnClick={() => (location.href = "/dashboard")}
            />
            <Button
              label="Try Demo"
              theme={theme}
              variant="secondary"
              handleOnClick={() => (location.href = "/shorten")}
            />
          </div>
        </div>
        <div className={stl.img}>
          <Image src={Img} alt="img" priority />
        </div>
      </div>
    </section>
  );
};

export default Intro;
