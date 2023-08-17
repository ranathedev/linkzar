import React, { useEffect } from "react";
import clsx from "clsx";

import ActionBox from "components/action-box";
import LinkEditor from "components/link-editor";
import Modal from "components/modal";
import Spinner from "components/spinner";
import Toast from "components/toast";

import DownIcon from "assets/chevron-down.svg";

import stl from "./TableRow.module.scss";

interface Props {
  domainUrl: string;
  linkData: {
    id: string;
    shortId: string;
    originalURL: string;
    dateCreated: string;
    clicks: number;
  };
  theme: string;
}

const TableRow = ({ domainUrl, linkData, theme }: Props) => {
  const [expand, setExpand] = React.useState(false);
  const [className, setClassName] = React.useState("");
  const [showActionList, setShowActionList] = React.useState(false);
  const [width, setWidth] = React.useState(1000);
  const [showModal, setShowModal] = React.useState(false);
  const [showEditor, setShowEditor] = React.useState(false);
  const [loading, setLoading] = React.useState("");
  const [showToast, setShowToast] = React.useState(false);
  const [toast, setToast] = React.useState({ variant: "", msg: "" });

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

  const getResponse = (res: any) => {
    console.log(res);
    setShowToast(true);
    if (res.error) {
      setToast({ variant: "warn", msg: res.error });
    } else if (res.err) {
      setToast({ variant: "danger", msg: res.err });
    } else {
      setToast({ variant: "success", msg: "Link updated successfully!" });
    }
    setShowModal(false);
  };

  return (
    <>
      <Modal
        isVisible={showModal}
        theme={theme}
        dialog={
          loading === "" ? (
            <LinkEditor
              theme={theme}
              linkData={linkData}
              showEditor={showEditor}
              setLoading={setLoading}
              setShowEditor={setShowEditor}
              setShowModal={setShowModal}
              sendResponse={getResponse}
            />
          ) : (
            <Spinner taskTitle={loading} />
          )
        }
      />
      <ActionBox
        display={showActionList ? "inline-flex" : "none"}
        theme={theme}
        domainUrl={domainUrl}
        variant="secondary"
        linkData={linkData}
        setShowModal={setShowModal}
        setShowEditor={setShowEditor}
      />
      <Toast
        theme={theme}
        isVisible={showToast}
        variant={toast.variant}
        content={toast.msg}
        setShowToast={setShowToast}
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
          domainUrl={domainUrl}
          theme={theme}
          linkData={linkData}
          setShowEditor={setShowEditor}
          setShowModal={setShowModal}
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
    id: "64dcac9194d3a3336afe917d",
    shortId: "aftaab",
    originalURL: "https://www.youtube.com/watch?v=I7EDAR2GRVo",
    clicks: 345,
    dateCreated: "Aug-10-2023",
  },
};

export default TableRow;
