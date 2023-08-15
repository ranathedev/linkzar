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

import LinkIcon from "assets/link.svg";
import OpenLinkIcon from "assets/openLink.svg";
import CopyIcon from "assets/copy.svg";
import ShareIcon from "assets/share.svg";
import DeleteIcon from "assets/delete.svg";

import stl from "./URLShortener.module.scss";

interface Props {
  theme: string;
  isVisible: boolean;
  setShowModal: (arg: boolean) => void;
}

const URLShortener = ({ theme, setShowModal, isVisible }: Props) => {
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

  useEffect(() => {
    if (isVisible) {
      inputFocus("originalLink");
    } else {
      handleReset();
    }
  }, [isVisible]);

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

  const handleSubmit = () => {
    const isValidURL = validateUrl(url);

    if (url !== "") {
      if (isValidURL) {
        if (alias === "" || alias.length >= 5) {
          const shortId = alias === "" ? generateRandomString(7) : alias;
          createShortLink(setLoading, shortId, url, setLinkData);
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

  const getResponse = (res: string) => {
    if (res === "Link deleted successfully!") {
      console.log(res);
      handleReset();
    } else {
      console.error(res);
    }
  };

  const domainUrl = "http://localhost:3001";

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
      <div
        className={clsx(stl.urlShortener, isVisible ? stl.show : "", className)}
      >
        {loading !== "" ? (
          <Spinner taskTitle={loading} />
        ) : (
          <>
            <h2 className={stl.heading}>URL Shortener</h2>
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
                    label="Shorten URL"
                    theme={theme}
                    handleOnClick={handleSubmit}
                  />
                  <Button
                    label="Back to Dashboard"
                    theme={theme}
                    variant="secondary"
                    handleOnClick={() => setShowModal(false)}
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
                  {domainUrl + "/" + linkData.shortId}
                  <div className={stl.optContainer}>
                    <div className={stl.options}>
                      <button
                        className={stl.btn}
                        onClick={() =>
                          navigator.clipboard.writeText(
                            domainUrl + "/" + linkData.shortId
                          )
                        }
                      >
                        <CopyIcon />
                      </button>
                      <button
                        className={stl.btn}
                        onClick={() =>
                          window.open(
                            domainUrl + "/" + linkData.shortId,
                            "_blank"
                          )
                        }
                      >
                        <OpenLinkIcon />
                      </button>
                      {device === "Mobile" && (
                        <button
                          className={stl.btn}
                          onClick={() =>
                            shareShortLink(domainUrl + "/" + linkData.shortId)
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
                    label="Shorten another"
                    icon={<LinkIcon />}
                    theme={theme}
                    handleOnClick={handleReset}
                  />
                  <Button
                    label="Back to Dashboard"
                    variant="secondary"
                    theme={theme}
                    handleOnClick={() => setShowModal(false)}
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
};

export default URLShortener;
