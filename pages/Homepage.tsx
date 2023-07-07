import React from "react";

import Intro from "components/intro";
import HeroSection from "components/hero-section";
import FAQSection from "components/faq-section";
import CTA from "components/cta";

import stl from "./index.module.scss";

interface Props {
  theme: string;
}

const Homepage = ({ theme }: Props) => {
  return (
    <div className={stl.homepage}>
      <Intro theme={theme} />
      <HeroSection theme={theme} swap={true} />
      <HeroSection theme={theme} background="transparent" />
      <HeroSection theme={theme} swap={true} />
      <FAQSection theme={theme} />
      <CTA theme={theme} />
    </div>
  );
};

export default Homepage;
