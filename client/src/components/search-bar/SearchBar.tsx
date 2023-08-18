import React, { useEffect } from "react";
import clsx from "clsx";

import { isMac } from "lib/utils";

import SearchIcon from "assets/search-icon.svg";

import stl from "./SearchBar.module.scss";

interface Props {
  theme: string;
}

const SearchBar = ({ theme }: Props) => {
  const [className, setClassName] = React.useState("");
  const [device, setDevice] = React.useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (theme === "dark") {
        setClassName(stl.darkSearchBar);
      } else {
        setClassName("");
      }
    }
  }, [theme]);

  useEffect(() => {
    isMac() ? setDevice("Mac") : setDevice("");
  }, []);

  return (
    <div className={clsx(stl.searchBar, className)}>
      <div className={stl.icon}>
        <SearchIcon />
      </div>
      <div className={stl.hint}>
        {device === "Mac" ? <>&#8984;</> : "Ctrl"} K
      </div>
      <input
        type="search"
        id="searchInput"
        placeholder="Search"
        spellCheck={false}
      />
      <button>Search</button>
    </div>
  );
};

export default SearchBar;
