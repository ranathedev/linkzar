import React from "react";

import stl from "./Spinner.module.scss";

const Spinner = () => {
  return (
    <div className={stl.spinner}>
      <div />
      <div />
      <div />
      <div />
      <span>Processing&nbsp;...</span>
    </div>
  );
};

export default Spinner;
