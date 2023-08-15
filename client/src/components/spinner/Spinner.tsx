import React from "react";

import stl from "./Spinner.module.scss";

interface Props {
  taskTitle: string;
  variant: "primary" | "secondary";
}

const Spinner = ({ taskTitle, variant }: Props) => {
  return (
    <div className={stl.spinner}>
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
