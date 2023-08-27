import React, { useEffect } from "react";
import clsx from "clsx";

import { getLinks } from "lib/utils";
import TableRow from "components/table-row";
import SearchBar from "components/search-bar";
import LoadingSpinner from "components/loading-spinner";
import Button from "components/button";
import Modal from "components/modal";
import URLShortener from "components/url-shortener";
import Toast from "components/toast";

import RefreshIcon from "assets/refresh.svg";
import AddIcon from "assets/plus.svg";

import stl from "./LinkTable.module.scss";

interface Props {
  theme: string;
  domainUrl: string;
}

interface LinkType {
  _id: string;
  shortId: string;
  originalURL: string;
  createdDate: string;
  clickCounts: number;
}

const LinkTable = ({ theme, domainUrl }: Props) => {
  const [className, setClassName] = React.useState("");
  const [listOfLinks, setListOfLinks] = React.useState<LinkType[]>([]);
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [uid, setUid] = React.useState("");
  const [showToast, setShowToast] = React.useState(false);
  const [toastOpts, setToastOpts] = React.useState({ variant: "", msg: "" });

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (theme === "dark") {
        setClassName(stl.darkLinkTable);
      } else {
        setClassName("");
      }
    }
  }, [theme]);

  useEffect(() => {
    const linksData = localStorage.getItem("links");
    //@ts-ignore
    const links = JSON.parse(linksData);
    setListOfLinks(links);

    const data = localStorage.getItem("user");
    //@ts-ignore
    const user = JSON.parse(data);
    const uid = user?.uid;
    setUid(uid);
  }, []);

  const refresh = async () => {
    const links = await getLinks(setIsRefreshing, uid);

    if (!links.err) {
      setListOfLinks(links);
    } else {
      setShowToast(true);
      setToastOpts({ variant: "danger", msg: "Can't refresh collection." });
    }
  };

  const saveDataToLocalStorage = async (data: any) => {
    await localStorage.setItem("links", JSON.stringify(data));
  };

  const addNewLink = async (newLink: any) => {
    const updatedList = [...listOfLinks];
    updatedList.unshift(newLink);

    setListOfLinks(updatedList);
    saveDataToLocalStorage(updatedList);
  };

  const removeLink = async (linkId: string) => {
    const updatedList = listOfLinks.filter((link) => link._id !== linkId);

    setListOfLinks(updatedList);
    saveDataToLocalStorage(updatedList);
  };

  const updateLinkInList = async (updatedLink: any) => {
    const updatedListOfLinks = listOfLinks.map((link) =>
      link._id === updatedLink._id ? updatedLink : link
    );

    setListOfLinks(updatedListOfLinks);
    saveDataToLocalStorage(updatedListOfLinks);
  };

  const increaseClickCount = (linkId: string) => {
    const linkIndex = listOfLinks.findIndex((link) => link._id === linkId);

    if (linkIndex !== -1) {
      const updatedLinks = [...listOfLinks];

      updatedLinks[linkIndex].clickCounts += 1;

      setListOfLinks(updatedLinks);
      saveDataToLocalStorage(updatedLinks);
    }
  };

  return (
    <>
      <Toast
        theme={theme}
        isVisible={showToast}
        setShowToast={setShowToast}
        variant={toastOpts.variant}
        content={toastOpts.msg}
      />
      <Modal
        isVisible={showModal}
        theme={theme}
        dialog={
          <URLShortener
            domainUrl={domainUrl}
            isVisible={showModal}
            sendNewLink={addNewLink}
            setShowModal={setShowModal}
            sendDeleteId={removeLink}
            theme={theme}
            uid={uid}
          />
        }
      />
      <div className={clsx(stl.linkTable, className)}>
        <SearchBar theme={theme} />
        <div className={stl.btn}>
          <Button
            label="Create New"
            leftIcon={<AddIcon />}
            theme={theme}
            handleOnClick={() => setShowModal(true)}
          />
          <div
            className={clsx(stl.refresh, isRefreshing ? stl.animation : "")}
            onClick={refresh}
          >
            <RefreshIcon />
            <span>Refresh</span>
          </div>
        </div>
        <div className={stl.table}>
          <div className={stl.header}>
            <span className={stl.shortLink}>Short Link</span>
            <span className={stl.originalLink}>Original Link</span>
            <span className={stl.clicks}>Clicks</span>
            <span className={stl.date}>Date</span>
            <div className={stl.emptyBox} />
          </div>
          {isRefreshing ? (
            <div className={stl.loadingContainer}>
              <LoadingSpinner loading={isRefreshing} />
            </div>
          ) : (
            <>
              {listOfLinks && listOfLinks.length > 0 ? (
                listOfLinks.map((linkItem, i) => (
                  <TableRow
                    key={i}
                    domainUrl={domainUrl}
                    theme={theme}
                    sendDeleteId={removeLink}
                    sendUpdatedLinks={updateLinkInList}
                    increaseClickCount={increaseClickCount}
                    linkData={linkItem}
                    uid={uid}
                  />
                ))
              ) : (
                <p className={stl.note}>
                  You haven't added any links yet. Let's start building your
                  collection. Click the <b>Create New</b> button to add your
                  first link.
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default LinkTable;
