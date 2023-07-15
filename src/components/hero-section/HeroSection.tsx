import React from "react";
import Image from "next/image";
import clsx from "clsx";

import Img from "assets/url-shortener.png";

import stl from "./HeroSection.module.scss";

interface Props {
  theme: string;
}

const HeroSection = ({ theme }: Props) => {
  return (
    <section className={clsx(stl.heroSec, stl[`${theme}HeroSec`])}>
      <div className={stl.container}>
        <div className={stl.content}>
          <h1 className={stl.heading}>Payments tool for software companies</h1>
          <p className={stl.desc}>
            From checkout to global sales tax compliance, companies around the
            world use Flowbite to simplify their payment stack.
          </p>
          <button className={stl.primaryBtn}>
            Get started
            <svg
              className={stl.icon}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
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
