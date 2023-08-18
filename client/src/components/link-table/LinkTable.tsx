import React, { useEffect } from "react";
import clsx from "clsx";

import { getLinks } from "lib/utils";
import TableRow from "components/table-row";
import SearchBar from "components/search-bar";
import LoadingSpinner from "components/loading-spinner";
import Button from "components/button";
import Modal from "components/modal";
import URLShortener from "components/url-shortener";

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
  }, []);

  const refresh = async () => {
    const links = await getLinks(setIsRefreshing);

    setListOfLinks(links);
  };

  const addNewLink = async (newLink: any) => {
    const updatedList = [...listOfLinks];
    updatedList.unshift(newLink);

    setListOfLinks(updatedList);
    await localStorage.setItem("links", JSON.stringify(updatedList));
  };

  const removeLink = async (linkId: string) => {
    const updatedList = listOfLinks.filter((link) => link._id !== linkId);

    setListOfLinks(updatedList);
    await localStorage.setItem("links", JSON.stringify(updatedList));
  };

  const updateLinkInList = async (updatedLink: any) => {
    const updatedListOfLinks = listOfLinks.map((link) =>
      link._id === updatedLink._id ? updatedLink : link
    );

    setListOfLinks(updatedListOfLinks);
    await localStorage.setItem("links", JSON.stringify(updatedListOfLinks));
  };

  return (
    <div className={clsx(stl.linkTable, className)}>
      <Modal
        isVisible={showModal}
        theme={theme}
        dialog={
          <URLShortener
            domainUrl={domainUrl}
            isVisible={showModal}
            sendNewLink={addNewLink}
            setShowModal={setShowModal}
            theme={theme}
          />
        }
      />
      <SearchBar theme={theme} />
      <div className={stl.btn}>
        <Button
          label="Create New"
          icon={<AddIcon />}
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
            {listOfLinks.map((linkItem, i) => (
              <TableRow
                key={i}
                domainUrl={domainUrl}
                theme={theme}
                sendDeleteId={removeLink}
                sendUpdatedLinks={updateLinkInList}
                linkData={linkItem}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default LinkTable;
