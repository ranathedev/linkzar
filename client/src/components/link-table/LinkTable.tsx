import React, { useEffect } from "react";
import clsx from "clsx";

import TableRow from "components/table-row";
import SearchBar from "components/search-bar";
import LoadingSpinner from "components/loading-spinner";
import Button from "components/button";
import Modal from "components/modal";
import URLShortener from "components/url-shortener";

import RefreshIcon from "assets/refresh.svg";

import stl from "./LinkTable.module.scss";

interface Props {
  theme: string;
}

const LinkTable = ({ theme }: Props) => {
  const [className, setClassName] = React.useState("");
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

  const refresh = () => {
    setIsRefreshing(true);
    console.log("Refreshing the list...");

    setTimeout(() => {
      setIsRefreshing(false);
      console.log("List refreshed.");
    }, 3000);
  };

  return (
    <div className={clsx(stl.linkTable, className)}>
      <Modal
        isVisible={showModal}
        theme={theme}
        dialog={
          <URLShortener
            isVisible={showModal}
            setShowModal={setShowModal}
            theme={theme}
          />
        }
      />
      <SearchBar theme={theme} />
      <div className={stl.btn}>
        <Button
          label="Shorten link"
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
            <TableRow theme={theme} />
            <TableRow theme={theme} />
            <TableRow theme={theme} />
            <TableRow theme={theme} />
            <TableRow theme={theme} />
            <TableRow theme={theme} />
            <TableRow theme={theme} />
            <TableRow theme={theme} />
            <TableRow theme={theme} />
            <TableRow theme={theme} />
            <TableRow theme={theme} />
            <TableRow theme={theme} />
            <TableRow theme={theme} />
            <TableRow theme={theme} />
            <TableRow theme={theme} />
          </>
        )}
      </div>
    </div>
  );
};

export default LinkTable;
