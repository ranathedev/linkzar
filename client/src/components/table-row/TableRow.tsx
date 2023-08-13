import React, { useEffect } from "react";
import clsx from "clsx";

import ActionBox from "components/action-box";

import DownIcon from "assets/chevron-down.svg";

import stl from "./TableRow.module.scss";

interface Props {
  link: {
    shortURL: string;
    originalURL: string;
    dateCreated: string;
    clicks: number;
  };
  theme: string;
}

const TableRow = ({ link, theme }: Props) => {
  const [expand, setExpand] = React.useState(false);
  const [className, setClassName] = React.useState("");
  const [showActionList, setShowActionList] = React.useState(false);
  const [width, setWidth] = React.useState(1000);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (theme === "dark") {
        setClassName(stl.darkTableRow);
      } else {
        setClassName("");
      }
    }
  }, [theme]);

  useEffect(() => {
    width > 640 && setExpand(false);
    width < 640 ? setShowActionList(true) : setShowActionList(false);
  }, [width]);

  useEffect(() => {
    function measureWidth() {
      setWidth(document.body.clientWidth);
    }
    measureWidth();
    window.addEventListener("resize", measureWidth);
    return () => window.removeEventListener("resize", measureWidth);
  }, []);

  return (
    <>
      <ActionBox
        display={showActionList ? "inline-flex" : "none"}
        theme={theme}
        variant="secondary"
      />
      <div className={clsx(stl.tableRow, expand ? stl.expand : "", className)}>
        <span className={stl.shortLink}>
          <div className={stl.short}>
            <span className={stl.link}>
              <span className={stl.domain}>linkzar.glitch.me/</span>
              <span>{link.shortURL}</span>
            </span>
          </div>
        </span>
        <span className={stl.divider} />
        <span className={stl.originalLink}>{link.originalURL}</span>
        <span className={stl.divider} />
        <span className={stl.clicks}>{link.clicks}</span>
        <span className={stl.divider} />
        <span className={stl.date}>{link.dateCreated}</span>
        <ActionBox
          display={showActionList ? "none" : "inline-flex"}
          theme={theme}
        />
        <span className={stl.expandBtn} onClick={() => setExpand(!expand)}>
          <DownIcon />
        </span>
      </div>
    </>
  );
};

TableRow.defaultProps = {
  link: {
    shortURL: "OOOOOOO",
    originalURL: "https://ranaintizar.com",
    clicks: 345,
    dateCreated: "Aug-10-2023",
  },
};

export default TableRow;
