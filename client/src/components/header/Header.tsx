import React, { useEffect } from "react";
import Link from "next/link";
import clsx from "clsx";

import stl from "./Header.module.scss";

interface Props {
  links: Array<{ name: string; href: string }>;
  theme: string;
}

const Header = ({ links, theme }: Props) => {
  const [expand, setIsExpand] = React.useState(false);
  const [width, setWidth] = React.useState(500);
  const [active, setIsActive] = React.useState("Overview");
  const [className, setClassName] = React.useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (theme === "dark") {
        setClassName(stl.darkHeader);
      } else {
        setClassName("");
      }
    }
  }, [theme]);

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
          <Link href="/auth" className={stl.contactBtn}>
            Signup
          </Link>
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
      <ul className={stl.list}>
        {links.map((item, i) => (
          <li key={i}>
            <Link href={item.href}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </header>
  );
};

Header.defaultProps = {
  links: [
    { name: "Home", href: "/" },
    { name: "Shorten URL", href: "/shorten" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ],
};

export default Header;
