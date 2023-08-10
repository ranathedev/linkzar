import React, { useEffect } from "react";

// import LinkTable from "components/link-table";
import WelcomeBanner from "components/welcome-banner";

export default function Home() {
  // useEffect(() => {
  //   const searchInput = document.getElementById("searchInput");

  //   document.addEventListener("keydown", (event) => {
  //     if ((event.ctrlKey || event.metaKey) && event.key === "k") {
  //       event.preventDefault();

  //       searchInput?.focus();
  //     }
  //   });
  // });

  return (
    <main>
      <WelcomeBanner />
    </main>
  );
}
