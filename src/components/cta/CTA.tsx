import React from "react";
import clsx from "clsx";

import Button from "components/button";

import ArrowIcon from "assets/arrow-right.svg";

import stl from "./CTA.module.scss";

interface Props {
  theme: string;
}

const CTA = ({ theme }: Props) => {
  return (
    <section className={clsx(stl.cta, stl[`${theme}CTA`])}>
      <div className={stl.container}>
        <div className={stl.content}>
          <h2 className={stl.heading}>Start your free trial today</h2>
          <p className={stl.desc}>
            Try Flowbite Platform for 30 days. No credit card required.
          </p>
          <Button theme={theme} label="Get Started" icon={<ArrowIcon />} />
        </div>
      </div>
    </section>
  );
};

export default CTA;
