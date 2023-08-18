import React from "react";

import Dashboard from "components/dashboard";

export default function Home() {
  const domainUrl = "http://localhost:3001/";

  return (
    <main>
      <Dashboard theme="light" domainUrl={domainUrl} />
    </main>
  );
}
