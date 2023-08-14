import React, { useEffect } from "react";
import clsx from "clsx";

import { inputFocus } from "lib/utils";
import Sidebar from "components/sidebar";
import WelcomeBanner from "components/welcome-banner";
import LinkTable from "components/link-table";

import stl from "./Dashboard.module.scss";

interface Props {
  theme: string;
}

const Dashboard = ({ theme }: Props) => {
  const [className, setClassName] = React.useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (theme === "dark") {
        setClassName(stl.darkDashboard);
      } else {
        setClassName("");
      }
    }
  }, [theme]);

  useEffect(() => {
    document.addEventListener("keydown", (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "k") {
        event.preventDefault();
        inputFocus("searchInput");
      }
    });
  }, []);

  return (
    <div className={clsx(stl.dashboard, className)}>
      <Sidebar theme={theme} />
      <div className={stl.container}>
        <WelcomeBanner theme={theme} />
        <LinkTable theme={theme} />
      </div>
    </div>
  );
};

export default Dashboard;
