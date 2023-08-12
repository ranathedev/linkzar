import React from "react";
import clsx from "clsx";

import stl from "./LoadingSpinner.module.scss";

interface Props {
  size: number;
  strokeWidth: number;
  progress: number;
  color: string;
  rotate: number;
  loading: Boolean;
  customClass?: string;
}

const LoadingSpinner = ({
  size,
  strokeWidth,
  progress,
  color,
  rotate,
  loading,
  customClass,
}: Props) => {
  const radius = (size - strokeWidth) / 2;
  const viewBox = `0 0 ${size} ${size}`;
  const dashArray = radius * Math.PI * 2;
  const dashOffset = dashArray - (dashArray * progress) / 100;

  return (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      className={clsx(loading && stl.loading, customClass)}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <circle
        className={stl.circleBackground}
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={color}
        strokeWidth={`${strokeWidth}px`}
      />
      <circle
        className={stl.circleProgress}
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={color}
        strokeWidth={`${strokeWidth}px`}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{
          strokeDasharray: dashArray,
          strokeDashoffset: dashOffset,
        }}
      />
    </svg>
  );
};

LoadingSpinner.defaultProps = {
  color: "dodgerblue",
  size: 75,
  progress: 0,
  strokeWidth: 5,
  rotate: 0,
};

export default LoadingSpinner;
