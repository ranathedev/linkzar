import React, { useEffect, useRef } from "react";
import clsx from "clsx";

import {
  isMobileDevice,
  shareShortLink,
  inputFocus,
  handleDelLink,
  shareViaEmail,
  shareViaTwitter,
  shareViaLinkedIn,
  shareViaFacebook,
  shareViaWhatsapp,
} from "lib/utils";
import useOnClickOutside from "lib/useClickOutside";
import Modal from "components/modal";
import DialogBox from "components/dialog-box";
import Spinner from "components/spinner";
import ShareMenu from "components/share-menu";

import MoreIcon from "assets/more-icon.svg";
import OpenLinkIcon from "assets/openLink.svg";
import CopyIcon from "assets/copy.svg";
import ShareIcon from "assets/share.svg";
import EditIcon from "assets/edit.svg";
import DeleteIcon from "assets/delete.svg";
import DoneIcon from "assets/done.svg";

import stl from "./ActionBox.module.scss";

interface Props {
  display: string;
  theme: string;
  variant: "primary" | "secondary";
  domainUrl: string;
  linkData: {
    _id: string;
    shortId: string;
    originalURL: string;
    createdDate: string;
    clickCounts: number;
  };
  setShowEditor: (arg: boolean) => void;
  setShowModal: (arg: boolean) => void;
  increaseClickCount: (arg: string) => void;
  getResponse: (arg: any) => void;
  uid: string;
  sendVisibility: (arg: boolean) => void;
}

const ActionBox = ({
  theme,
  display,
  variant,
  domainUrl,
  linkData,
  setShowEditor,
  setShowModal,
  getResponse,
  increaseClickCount,
  uid,
  sendVisibility,
}: Props) => {
  const [showActionList, setShowActionList] = React.useState(false);
  const [device, setDevice] = React.useState("");
  const [className, setClassName] = React.useState("");
  const [loading, setLoading] = React.useState("");
  const [showDialog, setShowDialog] = React.useState(false);
  const [showShortTooltip, setShowShortTooltip] = React.useState(false);
  const [showLongTooltip, setShowLongTooltip] = React.useState(false);
  const [showShareMenu, setShowShareMenu] = React.useState(false);

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
    if (showShortTooltip) {
      setTimeout(() => {
        setShowShortTooltip(false);
      }, 1500);
    } else if (showLongTooltip) {
      setTimeout(() => {
        setShowLongTooltip(false);
      }, 1500);
    }
  }, [showShortTooltip, showLongTooltip]);

  useEffect(() => {
    sendVisibility(showActionList);
  }, [showActionList]);

  const ref = useRef(null);

  const hideActionList = () => {
    setShowActionList(false);
    setShowShareMenu(false);
  };

  useOnClickOutside(hideActionList, ref);

  const openLink = (link: string) => {
    window.open(link, "_blank");
    hideActionList();
  };

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
  };

  const handleShare = (link: string) => {
    shareShortLink(link);
    hideActionList();
  };

  const handleLinkEdit = () => {
    setShowModal(true);
    setShowEditor(true);
    hideActionList();
    inputFocus("editerInput");
  };

  const showDeleteDialog = () => {
    setShowDialog(true);
    hideActionList();
  };

  const handleDelete = () => {
    handleDelLink(linkData._id, setLoading, getResponse, uid);
    setShowDialog(false);
  };

  const getViaMethod = (method: string) => {
    const url = domainUrl + linkData.shortId;
    if (method === "Email") {
      shareViaEmail(url);
    } else if (method === "Twitter") {
      shareViaTwitter(url);
    } else if (method === "LinkedIn") {
      shareViaLinkedIn(url);
    } else if (method === "Facebook") {
      shareViaFacebook(url);
    } else if (method === "Whatsapp") {
      shareViaWhatsapp(url);
    }
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
            <DialogBox
              theme={theme}
              isVisible={showDialog}
              handleAction={handleDelete}
              handleCancel={() => setShowDialog(false)}
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
          <li
            onClick={() => {
              openLink(domainUrl + linkData.shortId);
              increaseClickCount(linkData._id);
            }}
          >
            <OpenLinkIcon /> Open short link
          </li>
          <li onClick={() => openLink(linkData.originalURL)}>
            <OpenLinkIcon />
            Open original link
          </li>
          <li
            onClick={() => {
              copyToClipboard(domainUrl + linkData.shortId);
              setShowShortTooltip(true);
            }}
          >
            {showShortTooltip ? <DoneIcon /> : <CopyIcon />} Copy short link
          </li>
          <li
            onClick={() => {
              copyToClipboard(linkData.originalURL);
              setShowLongTooltip(true);
            }}
          >
            {showLongTooltip ? <DoneIcon /> : <CopyIcon />}
            Copy original link
          </li>
          {device === "Mobile" ? (
            <li onClick={() => handleShare(domainUrl + linkData.shortId)}>
              <ShareIcon /> Share
            </li>
          ) : (
            <>
              <li className={stl.share} onClick={() => setShowShareMenu(true)}>
                <ShareIcon /> Share
              </li>
              <ShareMenu
                theme={theme}
                isVisible={showShareMenu}
                setShowShareMenu={setShowShareMenu}
                sendViaMethod={getViaMethod}
                customClass={stl.shareMenu}
              />
            </>
          )}
          <li onClick={handleLinkEdit}>
            <EditIcon /> Edit
          </li>
          <li onClick={showDeleteDialog}>
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
