import React from "react";

import Spinner from "components/spinner";

import stl from "./LoadingScreen.module.scss";

const LoadingScreen = () => {
  return (
    <div className={stl.loadingScreen}>
      <Spinner customClass={stl.spinner} />
    </div>
  );
};

export default LoadingScreen;
