import React, { useEffect } from "react";
import clsx from "clsx";

import { inputFocus } from "lib/utils";
import WelcomeBanner from "components/welcome-banner";
import LinkTable from "components/link-table";

import stl from "./Dashboard.module.scss";

interface Props {
  theme: string;
  domainUrl: string;
  user: any;
}

const Dashboard = ({ theme, domainUrl, user }: Props) => {
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
      <div className={stl.container}>
        <WelcomeBanner theme={theme} name={user.displayName} />
        <LinkTable theme={theme} domainUrl={domainUrl} />
      </div>
    </div>
  );
};

export default Dashboard;
