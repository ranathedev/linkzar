import React, { useEffect } from "react";
import firebase from "firebase/auth";

import auth from "lib/firebase";
import Dashboard from "components/dashboard";
import Layout from "components/layout";
import LoadingScreen from "components/loading-screen";
import VerificationDialog from "components/verification-dialog";

import stl from "./index.module.scss";

const DashboardPage = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [user, setUser] = React.useState<firebase.User | {}>({});
  const [isVerified, setIsVerified] = React.useState(false);
  const [theme, setTheme] = React.useState(() => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme");
      return storedTheme || "light";
    }
    return "light";
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);

    const mode = urlParams.get("mode");

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        setIsVerified(user.emailVerified);
      }

      if (mode !== "dev") {
        if (!user) {
          location.href = "/auth?type=signin";
        }
      }

      setIsLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  const domainUrl = "http://localhost:3000/";

  return isLoading ? (
    <LoadingScreen />
  ) : isVerified ? (
    <Layout theme={theme} setTheme={setTheme} user={user} title="Dashboard">
      <Dashboard theme={theme} domainUrl={domainUrl} user={user} />
    </Layout>
  ) : (
    <Layout theme={theme} setTheme={setTheme} user={user} title="Verify">
      <div className={stl.verification}>
        <VerificationDialog theme={theme} user={user} />
      </div>
    </Layout>
  );
};

export default DashboardPage;
