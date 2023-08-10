import React, { useEffect } from "react";
import Link from "next/link";
import clsx from "clsx";
import axios from "axios";

import {
  validateUrl,
  isMobileDevice,
  shareShortLink,
  handleDelLink,
  generateRandomString,
} from "lib/utils";
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
  const [alias, setAlias] = React.useState("");
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
    const shortURL = alias === "" ? generateRandomString(5) : alias;
    const isValidURL = validateUrl(url);
    const minLength = 5;

    if (isValidURL) {
      if (alias.length >= minLength || alias.length == 0) {
        const response = await axios.post(
          "https://urlzar.glitch.me/api/shorten",
          {
            headers: {
              "Content-Type": "application/json",
            },
            url,
            shortURL,
          }
        );

        if (response.status === 200) {
          const data = response.data;
          console.log(data);
          if (!data.err) {
            setLongURL(data.originalURL);
            setShortURL(data.shortURL);
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

  const handleReset = () => {
    setShortURL("");
    setLongURL("");
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
                    isDisabled={true}
                    label="Goto Dashboard"
                    theme={theme}
                    variant="secondary"
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
                        onClick={() =>
                          handleDelLink(longURL, setIsLoading, handleReset)
                        }
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
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default URLShortener;
