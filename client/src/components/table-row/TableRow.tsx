import React, { useEffect } from "react";
import clsx from "clsx";

import ActionBox from "components/action-box";
import LinkEditor from "components/link-editor";
import Modal from "components/modal";

import DownIcon from "assets/chevron-down.svg";

import stl from "./TableRow.module.scss";

interface Props {
  linkData: {
    id: string;
    shortId: string;
    originalURL: string;
    dateCreated: string;
    clicks: number;
  };
  theme: string;
}

const TableRow = ({ linkData, theme }: Props) => {
  const [expand, setExpand] = React.useState(false);
  const [className, setClassName] = React.useState("");
  const [showActionList, setShowActionList] = React.useState(false);
  const [width, setWidth] = React.useState(1000);
  const [showEditor, setShowEditor] = React.useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (theme === "dark") {
        setClassName(stl.darkTableRow);
      } else {
        setClassName("");
      }
    }
  }, [theme]);

  useEffect(() => {
    width > 640 && setExpand(false);
    width < 640 ? setShowActionList(true) : setShowActionList(false);
  }, [width]);

  useEffect(() => {
    function measureWidth() {
      setWidth(document.body.clientWidth);
    }
    measureWidth();
    window.addEventListener("resize", measureWidth);
    return () => window.removeEventListener("resize", measureWidth);
  }, []);

  return (
    <>
      <Modal
        isVisible={showEditor}
        theme={theme}
        dialog={
          <LinkEditor
            theme={theme}
            linkId={linkData.id}
            showEditor={showEditor}
            setShowEditor={setShowEditor}
          />
        }
      />
      <ActionBox
        display={showActionList ? "inline-flex" : "none"}
        theme={theme}
        variant="secondary"
        linkData={linkData}
        setShowEditor={setShowEditor}
      />
      <div className={clsx(stl.tableRow, expand ? stl.expand : "", className)}>
        <span className={stl.shortLink}>
          <div className={stl.short}>
            <span className={stl.link}>
              <span className={stl.domain}>linkzar.glitch.me/</span>
              <span>{linkData.shortId}</span>
            </span>
          </div>
        </span>
        <span className={stl.divider} />
        <span className={stl.originalLink}>{linkData.originalURL}</span>
        <span className={stl.divider} />
        <span className={stl.clicks}>{linkData.clicks}</span>
        <span className={stl.divider} />
        <span className={stl.date}>{linkData.dateCreated}</span>
        <ActionBox
          display={showActionList ? "none" : "inline-flex"}
          theme={theme}
          linkData={linkData}
          setShowEditor={setShowEditor}
        />
        <span className={stl.expandBtn} onClick={() => setExpand(!expand)}>
          <DownIcon />
        </span>
      </div>
    </>
  );
};

TableRow.defaultProps = {
  linkData: {
    id: "64afd1600bfe1e67c6b7ae71",
    shortId: "ranathat",
    originalURL: "https://ranaintizar.com",
    clicks: 345,
    dateCreated: "Aug-10-2023",
  },
};

export default TableRow;
