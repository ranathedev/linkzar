import React, { useEffect, useRef } from "react";
import clsx from "clsx";

import { isMobileDevice, shareShortLink, inputFocus } from "lib/utils";
import useOnClickOutside from "lib/useClickOutside";
import Modal from "components/modal";
import DeleteDialog from "components/delete-dialog";
import Spinner from "components/spinner";

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
    shortId: string;
    originalURL: string;
    dateCreated: string;
    clicks: number;
  };
  setShowEditor: (arg: boolean) => void;
}

const ActionBox = ({
  theme,
  display,
  variant,
  linkData,
  setShowEditor,
}: Props) => {
  const [showActionList, setShowActionList] = React.useState(false);
  const [device, setDevice] = React.useState("");
  const [className, setClassName] = React.useState("");
  const [loading, setLoading] = React.useState("");
  const [showDialog, setShowDialog] = React.useState(false);

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

  const ref = useRef(null);

  useOnClickOutside(() => setShowActionList(false), ref);

  const domainUrl = "https://linkzar.glitch.me/";

  const getResponse = (res: string) => {
    console.log(res);
  };

  const openLink = (link: string) => {
    window.open(link, "_blank");
    setShowActionList(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    console.log("Copied!");
    setShowActionList(false);
  };

  const handleShare = (link: string) => {
    shareShortLink(link);
    setShowActionList(false);
  };

  const handleLinkEdit = () => {
    setShowEditor(true);
    inputFocus("editerInput");
    setShowActionList(false);
  };

  const handleDelete = () => {
    setShowDialog(true);
    setShowActionList(false);
  };

  return (
    <>
      <Modal
        isVisible={showDialog || loading !== ""}
        theme={theme}
        dialog={
          loading !== "" ? (
            <Spinner taskTitle={loading} variant="secondary" />
          ) : (
            <DeleteDialog
              theme={theme}
              isVisible={showDialog}
              id={linkData.id}
              getResponse={getResponse}
              setLoading={setLoading}
              setShowDialog={setShowDialog}
            />
          )
        }
      />
      <div
        ref={ref}
        style={{ display }}
        className={clsx(stl.actionsBox, className, stl[variant])}
      >
        <button onClick={() => setShowActionList(!showActionList)}>
          <MoreIcon />
        </button>
        <ul className={showActionList ? stl.actionList : ""}>
          <li onClick={() => openLink(domainUrl + linkData.shortId)}>
            <OpenLinkIcon /> Open short link
          </li>
          <li onClick={() => openLink(linkData.originalURL)}>
            <OpenLinkIcon />
            Open original link
          </li>
          <li onClick={() => copyToClipboard(domainUrl + linkData.shortId)}>
            <CopyIcon /> Copy short link
          </li>
          <li onClick={() => copyToClipboard(linkData.originalURL)}>
            <CopyIcon />
            Copy original link
          </li>
          {device === "Mobile" && (
            <li onClick={() => handleShare(domainUrl + linkData.shortId)}>
              <ShareIcon /> Share
            </li>
          )}
          <li onClick={handleLinkEdit}>
            <EditIcon /> Edit
          </li>
          <li onClick={handleDelete}>
            <DeleteIcon /> Delete
          </li>
        </ul>
      </div>
    </>
  );
};

ActionBox.defaultProps = {
  display: "inline-flex",
  variant: "primary",
};

export default ActionBox;
