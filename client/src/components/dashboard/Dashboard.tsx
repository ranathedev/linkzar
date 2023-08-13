import React, { useEffect } from "react";
import clsx from "clsx";

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
