import React, { useEffect } from "react";
import Link from "next/link";
import clsx from "clsx";
import axios from "axios";

import {
  validateUrl,
  isMobileDevice,
  shareShortLink,
  generateRandomString,
  inputFocus,
} from "lib/utils";
import Button from "components/button";
import Spinner from "components/spinner";
import DeleteDialog from "components/delete-dialog";
import Modal from "components/modal";

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
  const [isLoading, setIsLoading] = React.useState(false);
  const [className, setClassName] = React.useState("");
  const [device, setDevice] = React.useState("");
  const [showDialog, setShowDialog] = React.useState(false);

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
    e.keyCode === 13 && handleSubmit();
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const shortId = alias === "" ? generateRandomString(7) : alias;
    const isValidURL = validateUrl(url);
    const minLength = 5;

    if (isValidURL) {
      if (alias.length >= minLength || alias.length == 0) {
        const response = await axios.post("http://localhost:3001/api/shorten", {
          headers: {
            "Content-Type": "application/json",
          },
          url,
          shortId,
        });

        if (response.status === 200) {
          const data = response.data;
          console.log(data);
          if (!data.err) {
            setLinkData(data);
          } else {
            console.error(data.err);
          }
        } else {
          console.log("Error:", response.statusText);
        }
        setURL("");
        setAlias("");
      } else {
        console.log("Alias must be at least 5 aphanumeric chars.");
      }
    } else {
      console.log("URL is not Valid");
    }
    setIsLoading(false);
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
            setIsLoading={setIsLoading}
            setShowDialog={setShowDialog}
          />
        }
      />
      <div
        className={clsx(stl.urlShortener, isVisible ? stl.show : "", className)}
      >
        {isLoading ? (
          <Spinner />
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
                <input
                  value={alias}
                  className={stl.alias}
                  onChange={(e) => setAlias(e.target.value)}
                  placeholder="Enter alias here (optional)"
                  spellCheck={false}
                />
                <label>Alias must be 5 alphanumeric chars</label>
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
                <Button
                  label="Shorten another"
                  icon={<LinkIcon />}
                  theme={theme}
                  handleOnClick={handleReset}
                />
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
