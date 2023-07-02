import React, { useEffect } from "react";
import Image from "next/image";
import clsx from "clsx";

import Img from "assets/url-shortener.png";
import ArrowIcon from "assets/arrow-right.svg";

import stl from "./HeroSection.module.scss";

interface Props {
  theme: string;
}

const HeroSection = ({ theme }: Props) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
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
  }, []);

  return (
    <section className={clsx(stl.heroSec, stl[`${theme}HeroSec`])}>
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
            From checkout to global sales tax compliance, companies around the
            world use Flowbite to simplify their payment stack.
          </p>
          <button className={stl.primaryBtn}>
            Get started <ArrowIcon />
          </button>
          <button className={stl.secondaryBtn}>Speak to Sales</button>
        </div>
        <div className={stl.img}>
          <Image src={Img} alt="img" layout="responsive" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
