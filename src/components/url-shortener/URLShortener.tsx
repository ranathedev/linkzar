import React, { useEffect } from "react";
import Link from "next/link";
import clsx from "clsx";

import Button from "components/button";

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
  const [givenLink, setGivenLink] = React.useState("");
  const [longURL, setLongURL] = React.useState("");
  const [shortURL, setShortURL] = React.useState("");
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

  const handleSubmit = () => {
    console.log(givenLink);
    setLongURL(givenLink);
    setShortURL("https://shorturl.at/jtwz4");
    setGivenLink("");
  };

  return (
    <div className={clsx(stl.urlShotener, className)}>
      <div className={stl.container}>
        <h2 className={stl.heading}>URL Shortener</h2>
        {shortURL === "" && (
          <div className={stl.searchBar}>
            <div className={stl.searchIcon}>
              <LinkIcon />
            </div>
            <input
              value={givenLink}
              placeholder="Enter link here"
              onChange={(e) => setGivenLink(e.target.value)}
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
            <div className={stl.link}>
              https://shorturl.at/jtwz4
              <div className={stl.options}>
                <button className={stl.btn}>
                  <OpenLinkIcon />
                </button>
                <button className={stl.btn}>
                  <CopyIcon />
                </button>
                <button className={stl.btn}>
                  <ShareIcon />
                </button>
                <button className={stl.btn}>
                  <DeleteIcon />
                </button>
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
              handleOnClick={() => {
                setShortURL("");
                setLongURL("");
              }}
            />
          )}
          <Button label="Goto Dashboard" theme={theme} variant="secondary" />
        </div>
      </div>
    </div>
  );
};

export default URLShortener;
