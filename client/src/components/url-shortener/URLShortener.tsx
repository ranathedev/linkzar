import React, { useEffect } from "react";
import Link from "next/link";
import clsx from "clsx";

import {
  isMobileDevice,
  createShortLink,
  generateRandomString,
  shareShortLink,
  validateUrl,
  inputFocus,
} from "lib/utils";
import Button from "components/button";
import Spinner from "components/spinner";
import DeleteDialog from "components/delete-dialog";
import Modal from "components/modal";
import InputError from "components/input-error";
import Tooltip from "components/tooltip";
import Toast from "components/toast";

import LinkIcon from "assets/link.svg";
import OpenLinkIcon from "assets/openLink.svg";
import CopyIcon from "assets/copy.svg";
import ShareIcon from "assets/share.svg";
import DeleteIcon from "assets/delete.svg";
import DoneIcon from "assets/done.svg";

import stl from "./URLShortener.module.scss";

interface Props {
  theme: string;
  isVisible: boolean;
  domainUrl: string;
  setShowModal: (arg: boolean) => void;
  sendNewLink: (arg: any) => void;
}

const URLShortener = ({
  theme,
  isVisible,
  domainUrl,
  setShowModal,
  sendNewLink,
}: Props) => {
  const [url, setURL] = React.useState("");
  const [alias, setAlias] = React.useState("");
  const [linkData, setLinkData] = React.useState({
    _id: "",
    shortId: "",
    originalURL: "",
    clickCounts: 0,
  });
  const [loading, setLoading] = React.useState("");
  const [className, setClassName] = React.useState("");
  const [device, setDevice] = React.useState("");
  const [showDialog, setShowDialog] = React.useState(false);
  const [urlErr, setUrlErr] = React.useState("");
  const [aliasErr, setAliasErr] = React.useState("");
  const [showTooltip, setShowTooltip] = React.useState(false);
  const [showToast, setShowToast] = React.useState(false);
  const [toast, setToast] = React.useState({ variant: "", msg: "" });

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (theme === "dark") {
        setClassName(stl.darkURLShortener);
      } else {
        setClassName("");
      }
    }
  }, [theme]);

  useEffect(() => {
    isMobileDevice() ? setDevice("Mobile") : setDevice("");
  }, []);

  useEffect(() => {
    if (showTooltip) {
      setTimeout(() => {
        setShowTooltip(false);
      }, 1500);
    }
  }, [showTooltip]);

  useEffect(() => {
    if (isVisible) {
      inputFocus("originalLink");
    } else {
      handleReset();
    }
  }, [isVisible]);

  const handleReset = () => {
    setURL("");
    setAlias("");
    setLinkData({
      _id: "",
      shortId: "",
      originalURL: "",
      clickCounts: 0,
    });
  };

  const handleKeyDown = (e: any) => {
    setUrlErr("");
    setAliasErr("");
    e.keyCode === 13 && handleSubmit();
  };

  const handleChange = (e: any) => {
    const input = e.target;
    const inputVal = input.value;
    const alphanumericRegex = /^[a-zA-Z0-9]*$/;
    const isAlphanumeric = alphanumericRegex.test(inputVal);

    if (inputVal.length <= 7) {
      if (!isAlphanumeric) {
        setAlias(inputVal.replace(/[^a-zA-Z0-9]/g, ""));
        setAliasErr("Only alphanumeric characters are allowed.");
      } else {
        setAlias(inputVal);
        setAliasErr("");
      }
    } else {
      setAliasErr("Alias cannot be more than 7 chars.");
    }
  };

  const handleSubmit = async () => {
    const isValidURL = validateUrl(url);

    if (url !== "") {
      if (isValidURL) {
        if (alias === "" || alias.length >= 5) {
          const shortId = alias === "" ? generateRandomString(7) : alias;
          const response = await createShortLink(setLoading, shortId, url);

          setShowToast(true);
          if (response.err) {
            setToast({
              variant: "warn",
              msg: response.err,
            });
          } else {
            setLinkData(response);
            setToast({ variant: "success", msg: "Link created successfully!" });
            sendNewLink(response);
          }
        } else {
          setAliasErr("Alias cannot be less than 5 chars.");
        }
      } else {
        setUrlErr("Url is not valid.");
      }
    } else {
      setUrlErr("Url cannot be empty.");
    }
  };

  const getResponse = (res: any) => {
    if (!res.err) {
      setShowToast(true);
      setToast({ variant: "success", msg: "Link deleted successfully!" });
      handleReset();
    } else {
      setShowToast(true);
      setToast({ variant: "danger", msg: res.err });
    }
  };

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setShowTooltip(true);
  };

  return (
    <>
      <Modal
        isVisible={showDialog}
        theme={theme}
        dialog={
          <DeleteDialog
            theme={theme}
            isVisible={showDialog}
            id={linkData._id}
            getResponse={getResponse}
            setLoading={setLoading}
            setShowDialog={setShowDialog}
          />
        }
      />
      <Toast
        variant={toast.variant}
        content={toast.msg}
        theme={theme}
        isVisible={showToast}
        setShowToast={setShowToast}
      />
      <div
        className={clsx(stl.urlShortener, isVisible ? stl.show : "", className)}
      >
        {loading !== "" ? (
          <Spinner taskTitle={loading} />
        ) : (
          <>
            <h2 className={stl.heading}>Shorten New Link</h2>
            {linkData.shortId === "" && (
              <div className={stl.searchBar}>
                <div className={stl.searchIcon}>
                  <LinkIcon />
                </div>
                <input
                  value={url}
                  id="originalLink"
                  placeholder="Enter link here"
                  onChange={(e) => setURL(e.target.value)}
                  onKeyDown={handleKeyDown}
                  spellCheck={false}
                />
                <InputError theme={theme} error={urlErr} />
                <input
                  value={alias}
                  className={stl.alias}
                  onChange={handleChange}
                  placeholder="Alias must be 5 chars. (optional)"
                  onKeyDown={handleKeyDown}
                  spellCheck={false}
                />
                <InputError theme={theme} error={aliasErr} />
                <div className={stl.btnContainer}>
                  <Button
                    label="Back to Dashboard"
                    theme={theme}
                    variant="secondary"
                    handleOnClick={() => setShowModal(false)}
                  />
                  <Button
                    label="Shorten URL"
                    theme={theme}
                    handleOnClick={handleSubmit}
                  />
                </div>
              </div>
            )}
            {linkData.originalURL !== "" && (
              <div className={stl.longURL}>
                Long URL :{" "}
                <Link href={linkData.originalURL} target="_blank">
                  {linkData.originalURL}
                  <span>
                    <OpenLinkIcon />
                  </span>
                </Link>
              </div>
            )}
            {linkData.shortId !== "" && (
              <div className={stl.shortURL}>
                Short URL :{" "}
                <div
                  className={clsx(
                    stl.link,
                    isMobileDevice() ? "" : stl.hideOptions
                  )}
                >
                  {domainUrl + linkData.shortId}
                  <div className={stl.optContainer}>
                    <div className={stl.options}>
                      <button
                        className={stl.btn}
                        onClick={() =>
                          copyToClipboard(domainUrl + linkData.shortId)
                        }
                      >
                        {showTooltip ? <DoneIcon /> : <CopyIcon />}
                        <Tooltip theme={theme} isVisible={showTooltip} />
                      </button>
                      <button
                        className={stl.btn}
                        onClick={() =>
                          window.open(domainUrl + linkData.shortId, "_blank")
                        }
                      >
                        <OpenLinkIcon />
                      </button>
                      {device === "Mobile" && (
                        <button
                          className={stl.btn}
                          onClick={() =>
                            shareShortLink(domainUrl + linkData.shortId)
                          }
                        >
                          <ShareIcon />
                        </button>
                      )}
                      <button
                        className={stl.btn}
                        onClick={() => setShowDialog(true)}
                      >
                        <DeleteIcon />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className={stl.btnContainer}>
              {linkData.shortId !== "" && (
                <>
                  <Button
                    label="Back to Dashboard"
                    variant="secondary"
                    theme={theme}
                    handleOnClick={() => setShowModal(false)}
                  />
                  <Button
                    label="Shorten another"
                    rightIcon={<LinkIcon />}
                    theme={theme}
                    handleOnClick={handleReset}
                  />
                </>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

URLShortener.defaultProps = {
  isVisible: false,
  setShowModal: () => true,
};

export default URLShortener;
