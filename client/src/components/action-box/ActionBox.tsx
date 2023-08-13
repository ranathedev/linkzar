import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import axios from "axios";

import { isMobileDevice, shareShortLink, handleDelLink } from "lib/utils";
import useOnClickOutside from "lib/useClickOutside";

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
  linkData: {
    id: string;
    shortURL: string;
    originalURL: string;
    dateCreated: string;
    clicks: number;
  };
}

const ActionBox = ({ theme, display, variant, linkData }: Props) => {
  const [showActionList, setShowActionList] = React.useState(false);
  const [device, setDevice] = React.useState("");
  const [className, setClassName] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

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

  useEffect(() => {
    isLoading ? console.log("Loading...") : console.log("Loading complete.");
  }, [isLoading]);

  const ref = useRef(null);

  useOnClickOutside(() => setShowActionList(false), ref);

  const domainUrl = "https://linkzar.glitch.me/";

  const editLink = async () => {
    const response = await axios.post("http://localhost:3001/api/editLink", {
      headers: {
        "Content-Type": "application/json",
      },
      id: linkData.id,
    });

    const data = response.data;
    console.log(data);

    if (!data.err) {
      console.log(data.err);
    }
  };

  const handleReset = (res: string) => {
    console.log(res);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div
      ref={ref}
      style={{ display }}
      className={clsx(stl.actionsBox, className, stl[variant])}
    >
      <button onClick={() => setShowActionList(!showActionList)}>
        <MoreIcon />
      </button>
      <ul className={showActionList ? stl.actionList : ""}>
        <li
          onClick={() => {
            window.open(domainUrl + linkData.shortURL, "_blank");
            setShowActionList(false);
          }}
        >
          <OpenLinkIcon /> Open short link
        </li>
        <li
          onClick={() => {
            window.open(linkData.originalURL, "_blank");
            setShowActionList(false);
          }}
        >
          <OpenLinkIcon />
          Open original link
        </li>
        <li
          onClick={() => {
            copyToClipboard(domainUrl + linkData.shortURL);
            setShowActionList(false);
          }}
        >
          <CopyIcon /> Copy short link
        </li>
        <li
          onClick={() => {
            copyToClipboard(linkData.originalURL);
            setShowActionList(false);
          }}
        >
          <CopyIcon />
          Copy original link
        </li>
        {device === "Mobile" && (
          <li
            onClick={() => {
              shareShortLink(domainUrl + linkData.shortURL);
              setShowActionList(false);
            }}
          >
            <ShareIcon /> Share
          </li>
        )}
        <li
          onClick={() => {
            // editLink()
            setShowActionList(false);
          }}
        >
          <EditIcon /> Edit
        </li>
        <li
          onClick={() => {
            handleDelLink(linkData.originalURL, setIsLoading, handleReset);
            setShowActionList(false);
          }}
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
