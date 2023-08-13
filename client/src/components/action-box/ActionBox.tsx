import React, { useEffect } from "react";
import clsx from "clsx";

import { isMobileDevice, shareShortLink } from "lib/utils";

import stl from "./ActionBox.module.scss";

import MoreIcon from "assets/more-icon.svg";
import OpenLinkIcon from "assets/openLink.svg";
import CopyIcon from "assets/copy.svg";
import ShareIcon from "assets/share.svg";
import EditIcon from "assets/edit.svg";
import DeleteIcon from "assets/delete.svg";

interface Props {
  display: string;
  theme: string;
  variant: "primary" | "secondary";
}

const ActionBox = ({ theme, display, variant }: Props) => {
  const [showActionList, setShowActionList] = React.useState(false);
  const [device, setDevice] = React.useState("");
  const [className, setClassName] = React.useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (theme === "dark") {
        setClassName(stl.darkActionBox);
      } else {
        setClassName("");
      }
    }
  }, [theme]);

  useEffect(() => {
    isMobileDevice() ? setDevice("Mobile") : setDevice("");
  }, []);

  const domainUrl = "https://linkzar.glitch.me/";

  return (
    <div
      style={{ display }}
      className={clsx(stl.actionsBox, className, stl[variant])}
    >
      <button onClick={() => setShowActionList(!showActionList)}>
        <MoreIcon />
      </button>
      <ul className={showActionList ? stl.actionList : ""}>
        <li
        //  onClick={() => window.open(domainUrl + link.shortURL, "_blank")}
        >
          <OpenLinkIcon /> Open short link
        </li>
        <li
        //  onClick={() => window.open(domainUrl + link.shortURL, "_blank")}
        >
          <OpenLinkIcon />
          Open original link
        </li>
        <li
        //   onClick={() => navigator.clipboard.writeText(domainUrl + link.shortURL)}
        >
          <CopyIcon /> Copy short link
        </li>
        <li
        //   onClick={() => navigator.clipboard.writeText(domainUrl + link.shortURL)}
        >
          <CopyIcon />
          Copy original link
        </li>
        {device === "Mobile" && (
          <li>
            <ShareIcon /> Share
          </li>
        )}
        <li>
          <EditIcon /> Edit
        </li>
        <li
        // onClick={() => handleDelLink(link.originalURL, setIsLoading, handleReset)}
        >
          <DeleteIcon /> Delete
        </li>
      </ul>
    </div>
  );
};

ActionBox.defaultProps = {
  display: "inline-flex",
  variant: "primary",
};

export default ActionBox;
