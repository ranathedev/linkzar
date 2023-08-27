import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

import { logOut } from "lib/authFunctions";
import useOnClickOutside from "lib/useClickOutside";
import ToggleThemeBtn from "components/toggle-theme-btn";
import Toast from "components/toast";

import LogoutIcon from "assets/logout.svg";
import SettingsIcon from "assets/settings.svg";
import DashboardIcon from "assets/dashboard-2.svg";

import stl from "./UserMenu.module.scss";

interface Props {
  user: any;
  theme: string;
  setTheme: (arg: any) => void;
}

const UserMenu = ({ user, theme, setTheme }: Props) => {
  const [className, setClassName] = React.useState("");
  const [expand, setExpand] = React.useState(false);
  const [showToast, setShowToast] = React.useState(false);
  const [toastOpts, setToastOpts] = React.useState({ variant: "", msg: "" });

  const ref = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (theme === "dark") {
        setClassName(stl.darkUserMenu);
      } else {
        setClassName("");
      }
    }
  }, [theme]);

  useOnClickOutside(() => setExpand(false), ref);

  return (
    <>
      <Toast
        theme={theme}
        isVisible={showToast}
        variant={toastOpts.variant}
        content={toastOpts.msg}
        setShowToast={setShowToast}
      />
      <div ref={ref} className={clsx(stl.userMenu, className)}>
        <div className={stl.content} onClick={() => setExpand(!expand)}>
          <Image src={user.photoURL} width={30} height={30} alt="user-image" />
          <span className={stl.name}>{user.displayName}</span>
        </div>
        <div className={clsx(stl.menu, expand ? stl.show : "")}>
          <div
            className={stl.theme}
            onClick={() =>
              setTheme((prevTheme: string) =>
                prevTheme === "light" ? "dark" : "light"
              )
            }
          >
            <span>Theme</span>
            <ToggleThemeBtn customClass={stl.toggleBtn} theme={theme} />
          </div>
          <Link href="/settings" className={stl.settings}>
            <span>Settings</span>
            <SettingsIcon />
          </Link>
          <Link href="/dashboard" className={stl.dashboard}>
            <span>Dashboard</span>
            <DashboardIcon />
          </Link>
          <hr />
          <div
            className={stl.logout}
            onClick={() => logOut(setShowToast, setToastOpts)}
          >
            <span>Logout</span>
            <LogoutIcon />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserMenu;
