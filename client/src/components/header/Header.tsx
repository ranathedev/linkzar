import React, { useEffect } from "react";
import Link from "next/link";
import clsx from "clsx";

import UserMenu from "components/user-menu";
import ToggleThemeBtn from "components/toggle-theme-btn";

import stl from "./Header.module.scss";

interface Props {
  theme: string;
  setTheme: (arg: any) => void;
  user: any;
}

const Header = ({ theme, setTheme, user }: Props) => {
  const [expand, setIsExpand] = React.useState(false);
  const [width, setWidth] = React.useState(500);
  const [active, setIsActive] = React.useState("Overview");
  const [className, setClassName] = React.useState("");
  const [isAuthPage, setIsAuthPage] = React.useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (theme === "dark") {
        setClassName(stl.darkHeader);
      } else {
        setClassName("");
      }
    }
  }, [theme]);

  const links = [
    { name: "Home", href: "/" },
    user
      ? { name: "Dashboard", href: "/dashboard" }
      : { name: "Shorten URL", href: "/shorten" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  useEffect(() => {
    const btn = document.getElementById("btn");
    expand ? btn?.classList.add(stl.active) : btn?.classList.add(stl.noActive);
    expand
      ? btn?.classList.remove(stl.notActive)
      : btn?.classList.remove(stl.active);
  }, [expand]);

  useEffect(() => {
    width > 640 && setIsExpand(false);
  }, [width]);

  useEffect(() => {
    const path = location.pathname;

    if (path === "/auth") {
      setIsAuthPage(true);
    } else {
      setIsAuthPage(false);
    }

    function measureWidth() {
      setWidth(document.body.clientWidth);
    }
    measureWidth();
    window.addEventListener("resize", measureWidth);
    return () => window.removeEventListener("resize", measureWidth);
  }, []);

  return (
    <header
      style={expand ? { height: `${5.3 + links.length * 2}rem` } : {}}
      className={clsx(stl.header, className)}
    >
      <div className={stl.container}>
        <Link href="/" className={stl.logo}>
          Linkzar
        </Link>
        <div className={stl.menu}>
          {links.map((item, i: number) => (
            <Link
              key={i}
              href={item.href}
              onClick={() => setIsActive(item.name)}
              className={active === item.name ? stl.active : ""}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className={stl.right}>
          {user ? (
            <UserMenu theme={theme} setTheme={setTheme} user={user} />
          ) : (
            <>
              <ToggleThemeBtn
                customClass={stl.toggleBtn}
                theme={theme}
                handleOnClick={() =>
                  setTheme((prevTheme: string) =>
                    prevTheme === "light" ? "dark" : "light"
                  )
                }
              />
              {isAuthPage ? undefined : (
                <Link href="/auth?type=signup" className={stl.signupBtn}>
                  Sign Up
                </Link>
              )}
            </>
          )}
          <button
            id="btn"
            onClick={() => setIsExpand(!expand)}
            aria-label="Navigation"
            className={stl.expandBtn}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
      <ul
        style={expand ? { transform: "scaleY(1)" } : { transform: "scaleY(0)" }}
        className={stl.list}
      >
        {links.map((item, i) => (
          <li key={i}>
            <Link href={item.href}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </header>
  );
};

export default Header;
