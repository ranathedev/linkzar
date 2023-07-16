import React, { useEffect } from "react";
import Link from "next/link";
import clsx from "clsx";
import axios from "axios";

import { validateUrl, isMobileDevice } from "lib/utils";
import Button from "components/button";
import Spinner from "components/spinner";

import LinkIcon from "assets/link.svg";
import OpenLinkIcon from "assets/openLink.svg";
import CopyIcon from "assets/copy.svg";
import ShareIcon from "assets/share.svg";
import DeleteIcon from "assets/delete.svg";

import stl from "./URLShortener.module.scss";

interface Props {
  theme: string;
}

const URLShortener = ({ theme }: Props) => {
  const [url, setURL] = React.useState("");
  const [longURL, setLongURL] = React.useState("");
  const [shortURL, setShortURL] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [className, setClassName] = React.useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (theme === "dark") {
        setClassName(stl.darkURLShortener);
      } else {
        setClassName("");
      }
    }
  }, [theme]);

  const handleKeyDown = (e: any) => {
    e.keyCode === 13 && handleSubmit();
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const isValidURL = validateUrl(url);
    if (isValidURL) {
      const response = await axios.post("/api/shorten", {
        headers: {
          "Content-Type": "application/json",
        },
        url,
      });

      if (response.status === 200) {
        const data = response.data;
        console.log(data);
        setLongURL(data.originalURL);
        setShortURL(data.shortURL);
      } else {
        console.log("Error:", response.statusText);
      }
      setURL("");
    }
    setIsLoading(false);
  };

  const shareShortLink = (shortLink: string) => {
    if (navigator.share) {
      navigator
        .share({
          title: "Share Short Link",
          text: "Check out this short link:",
          url: shortLink,
        })
        .then(() => {
          console.log("Shared successfully");
        })
        .catch((error) => {
          console.error("Error sharing:", error);
        });
    } else {
      console.log("Web Share API is not supported on this device");
    }
  };

  const handleReset = () => {
    setShortURL("");
    setLongURL("");
  };

  const handleDelLink = async (originalURL: string) => {
    setIsLoading(true);
    const response = await axios.post("/api/deleteLink", {
      headers: {
        "Content-Type": "application/json",
      },
      originalURL,
    });

    if (response.status === 200) {
      const data = response.data;
      data && handleReset();
    } else {
      console.log("Error:", response.statusText);
    }
    setIsLoading(false);
  };

  return (
    <div className={clsx(stl.urlShotener, className)}>
      <div className={stl.container}>
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <h2 className={stl.heading}>URL Shortener</h2>
            {shortURL === "" && (
              <div className={stl.searchBar}>
                <div className={stl.searchIcon}>
                  <LinkIcon />
                </div>
                <input
                  value={url}
                  placeholder="Enter link here"
                  onChange={(e) => setURL(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <div className={stl.btnContainer}>
                  <Button
                    label="Shorten URL"
                    theme={theme}
                    handleOnClick={handleSubmit}
                  />
                </div>
              </div>
            )}
            {longURL !== "" && (
              <div className={stl.longURL}>
                Long URL :{" "}
                <Link href={longURL} target="_blank">
                  {longURL}
                  <span>
                    <OpenLinkIcon />
                  </span>
                </Link>
              </div>
            )}
            {shortURL !== "" && (
              <div className={stl.shortURL}>
                Short URL :{" "}
                <div
                  className={clsx(
                    stl.link,
                    isMobileDevice() ? "" : stl.hideOptions
                  )}
                >
                  {shortURL}
                  <div className={stl.optContainer}>
                    <div className={stl.options}>
                      <button
                        className={stl.btn}
                        onClick={() => window.open(shortURL, "_blank")}
                      >
                        <OpenLinkIcon />
                      </button>
                      <button
                        className={stl.btn}
                        onClick={() => navigator.clipboard.writeText(shortURL)}
                      >
                        <CopyIcon />
                      </button>
                      {isMobileDevice() && (
                        <button
                          className={stl.btn}
                          onClick={() => shareShortLink(shortURL)}
                        >
                          <ShareIcon />
                        </button>
                      )}
                      <button
                        className={stl.btn}
                        onClick={() => handleDelLink(longURL)}
                      >
                        <DeleteIcon />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className={stl.btnContainer}>
              {shortURL !== "" && (
                <Button
                  label="Shorten another"
                  icon={<LinkIcon />}
                  theme={theme}
                  handleOnClick={handleReset}
                />
              )}
              <Button
                label="Goto Dashboard"
                theme={theme}
                variant="secondary"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default URLShortener;
