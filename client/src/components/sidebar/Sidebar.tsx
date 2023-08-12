import React, { useEffect } from "react";
import Image from "next/image";
import clsx from "clsx";

import Logo from "@/public/favicon.ico";
import SidebarCollapseIcon from "assets/sidebar-collapse.svg";
import SidebarExpandIcon from "assets/sidebar-expand.svg";
import DashboardIcon from "assets/dashboard.svg";
import ProfileImage from "assets/profileImage.jpeg";
import MoreIcon from "assets/more-icon.svg";

import stl from "./Sidebar.module.scss";

interface Props {
  theme: string;
  list: Array<{ icon: React.ReactNode; title: string }>;
}

const Sidebar = ({ theme, list }: Props) => {
  const [className, setClassName] = React.useState("");
  const [collapse, setCollapse] = React.useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (theme === "dark") {
        setClassName(stl.darkSidebar);
      } else {
        setClassName("");
      }
    }
  }, [theme]);

  return (
    <div className={clsx(stl.sidebar, className, collapse ? stl.collapse : "")}>
      <div className={stl.container}>
        <div className={stl.header}>
          <div className={stl.logo}>
            <Image src={Logo} alt="logo" />
          </div>
          <button
            className={stl.sidebarBtn}
            onClick={() => setCollapse(!collapse)}
          >
            {collapse ? <SidebarCollapseIcon /> : <SidebarExpandIcon />}
          </button>
        </div>
        <div className={stl.divider} />
        <ul className={stl.list}>
          {list.map((item, i) => (
            <li key={i}>
              <span className={stl.icon}>{item.icon}</span>
              <span className={stl.title}>{item.title}</span>
            </li>
          ))}
        </ul>
        <div className={stl.divider} />
      </div>
      <div className={stl.account}>
        <div className={stl.left}>
          <div className={stl.img}>
            <Image src={ProfileImage} alt="profile-img" />
          </div>
          <span className={stl.name}>John Doe</span>
        </div>
        <button className={stl.moreBtn}>
          <MoreIcon />
        </button>
      </div>
    </div>
  );
};

Sidebar.defaultProps = {
  list: [
    { icon: <DashboardIcon />, title: "Dashboard" },
    { icon: <DashboardIcon />, title: "Dashboard" },
    { icon: <DashboardIcon />, title: "Dashboard" },
    { icon: <DashboardIcon />, title: "Dashboard" },
    { icon: <DashboardIcon />, title: "Dashboard" },
  ],
};

export default Sidebar;
