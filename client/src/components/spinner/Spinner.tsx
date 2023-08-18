import React from "react";
import clsx from "clsx";

import stl from "./Spinner.module.scss";

interface Props {
  taskTitle: string;
  variant: "primary" | "secondary";
  customClass?: string;
}

const Spinner = ({ taskTitle, variant, customClass }: Props) => {
  return (
    <div className={clsx(stl.spinner, customClass)}>
      <div />
      <div />
      <div />
      <div />
      <span className={stl[variant]}>{taskTitle}&nbsp;...</span>
    </div>
  );
};

Spinner.defaultProps = {
  taskTitle: "Processing",
  variant: "primary",
};

export default Spinner;
