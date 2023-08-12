import React, { useEffect } from "react";
import clsx from "clsx";

import { isMobileDevice, shareShortLink } from "lib/utils";

import DownIcon from "assets/chevron-down.svg";
import OpenLinkIcon from "assets/openLink.svg";
import CopyIcon from "assets/copy.svg";
import ShareIcon from "assets/share.svg";
import DeleteIcon from "assets/delete.svg";

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
  const [width, setWidth] = React.useState(1000);
  const [device, setDevice] = React.useState("");

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
  }, [width]);

  useEffect(() => {
    isMobileDevice() ? setDevice("Mobile") : setDevice("");

    function measureWidth() {
      setWidth(document.body.clientWidth);
    }
    measureWidth();
    window.addEventListener("resize", measureWidth);
    return () => window.removeEventListener("resize", measureWidth);
  }, []);

  const domainUrl = "https://urlzar.glitch.me/";

  return (
    <div className={clsx(stl.tableRow, expand ? stl.expand : "", className)}>
      <span className={stl.shortLink}>
        <div className={stl.short}>
          <span className={stl.domain}>urlzar.glitch.me/</span>
          <span>{link.shortURL}</span>
        </div>
        <div className={stl.optContainer}>
          <div className={stl.options}>
            <button
              className={stl.btn}
              onClick={() => window.open(domainUrl + link.shortURL, "_blank")}
            >
              <OpenLinkIcon />
            </button>
            <button
              className={stl.btn}
              onClick={() =>
                navigator.clipboard.writeText(domainUrl + link.shortURL)
              }
            >
              <CopyIcon />
            </button>
            {device === "Mobile" && (
              <button
                className={stl.btn}
                onClick={() => shareShortLink(domainUrl + link.shortURL)}
              >
                <ShareIcon />
              </button>
            )}
            <button
              className={stl.btn}
              // onClick={() =>
              //   handleDelLink(link.originalURL, setIsLoading, handleReset)
              // }
            >
              <DeleteIcon />
            </button>
          </div>
        </div>
      </span>
      <span className={stl.divider} />
      <span className={stl.originalLink}>{link.originalURL}</span>
      <span className={stl.divider} />
      <span className={stl.clicks}>{link.clicks}</span>
      <span className={stl.divider} />
      <span className={stl.date}>{link.dateCreated}</span>
      <span className={stl.expandBtn} onClick={() => setExpand(!expand)}>
        <DownIcon />
      </span>
    </div>
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
