import React, { useEffect } from "react";
import clsx from "clsx";

import Button from "components/button";

import ArrowIcon from "assets/arrow-right.svg";

import stl from "./CTA.module.scss";

interface Props {
  theme: string;
}

const CTA = ({ theme }: Props) => {
  const [className, setClassName] = React.useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (theme === "dark") {
        setClassName(stl.darkCTA);
      } else {
        setClassName("");
      }
    }
  }, [theme]);

  return (
    <section className={clsx(stl.cta, className)}>
      <div className={stl.container}>
        <div className={stl.content}>
          <h2 className={stl.heading}>Start your free trial today</h2>
          <p className={stl.desc}>
            Try Flowbite Platform for 30 days. No credit card required.
          </p>
          <Button
            theme={theme}
            label="Get Started"
            rightIcon={<ArrowIcon />}
            handleOnClick={() => (location.href = "/auth")}
          />
        </div>
      </div>
    </section>
  );
};

export default CTA;
