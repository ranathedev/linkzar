import React, { useState } from "react";

import AuthForm from "components/auth-form";

export default function Home() {
  const [formType, setFormType] = useState("sign up");
  return (
    <main>
      <AuthForm theme="light" formType={formType} setFormType={setFormType} />
    </main>
  );
}
