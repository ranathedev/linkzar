import React, { useEffect, useRef } from "react";
import clsx from "clsx";

import {
  isMobileDevice,
  shareShortLink,
  inputFocus,
  handleDelLink,
} from "lib/utils";
import useOnClickOutside from "lib/useClickOutside";
import Modal from "components/modal";
import DeleteDialog from "components/delete-dialog";
import Spinner from "components/spinner";
import Toast from "components/toast";

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
  sendDeleteId: (arg: string) => void;
  increaseClickCount: (arg: string) => void;
  uid: string;
}

const ActionBox = ({
  theme,
  display,
  variant,
  domainUrl,
  linkData,
  setShowEditor,
  setShowModal,
  sendDeleteId,
  increaseClickCount,
  uid,
}: Props) => {
  const [showActionList, setShowActionList] = React.useState(false);
  const [device, setDevice] = React.useState("");
  const [className, setClassName] = React.useState("");
  const [loading, setLoading] = React.useState("");
  const [showDialog, setShowDialog] = React.useState(false);
  const [showShortTooltip, setShowShortTooltip] = React.useState(false);
  const [showLongTooltip, setShowLongTooltip] = React.useState(false);
  const [showToast, setShowToast] = React.useState(false);
  const [toastOpts, setToastOpts] = React.useState({ variant: "", msg: "" });

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

  const ref = useRef(null);

  useOnClickOutside(() => setShowActionList(false), ref);

  const getResponse = (res: any) => {
    if (!res.err) {
      setShowToast(true);
      setToastOpts({ variant: "success", msg: "Link deleted successfully!" });
      sendDeleteId(linkData._id);
    } else {
      setShowToast(true);
      setToastOpts({ variant: "danger", msg: "Error:" + " " + res.err });
    }
  };

  const openLink = (link: string) => {
    window.open(link, "_blank");
    setShowActionList(false);
  };

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
  };

  const handleShare = (link: string) => {
    shareShortLink(link);
    setShowActionList(false);
  };

  const handleLinkEdit = () => {
    setShowModal(true);
    setShowEditor(true);
    setShowActionList(false);
    inputFocus("editerInput");
  };

  const showDeleteDialog = () => {
    setShowDialog(true);
    setShowActionList(false);
  };

  const handleDelete = () => {
    handleDelLink(linkData._id, setLoading, getResponse, uid);
    setShowDialog(false);
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
              handleDelete={handleDelete}
              handleCancel={() => setShowDialog(false)}
            />
          )
        }
      />
      <Toast
        variant={toastOpts.variant}
        content={toastOpts.msg}
        theme={theme}
        isVisible={showToast}
        setShowToast={setShowToast}
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
          {device === "Mobile" && (
            <li onClick={() => handleShare(domainUrl + linkData.shortId)}>
              <ShareIcon /> Share
            </li>
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
