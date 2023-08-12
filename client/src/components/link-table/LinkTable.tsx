import React, { useEffect } from "react";
import clsx from "clsx";

import TableRow from "components/table-row";

import stl from "./LinkTable.module.scss";

interface Props {
  theme: string;
}

const LinkTable = ({ theme }: Props) => {
  const [className, setClassName] = React.useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (theme === "dark") {
        setClassName(stl.darkLinkTable);
      } else {
        setClassName("");
      }
    }
  }, [theme]);

  return (
    <div className={clsx(stl.linkTable, className)}>
      <div className={stl.table}>
        <div className={stl.header}>
          <span className={stl.shortLink}>Short Link</span>
          <span className={stl.originalLink}>Original Link</span>
          <span className={stl.clicks}>Clicks</span>
          <span className={stl.date}>Date</span>
        </div>
        <TableRow theme={theme} />
        <TableRow theme={theme} />
        <TableRow theme={theme} />
        <TableRow theme={theme} />
        <TableRow theme={theme} />
      </div>
    </div>
  );
};

export default LinkTable;
