import React, { useEffect } from "react";
import { useRouter } from "next/router";
import firebase from "firebase/auth";

import auth from "lib/firebase";
import Dashboard from "components/dashboard";
import Layout from "components/layout";
import LoadingScreen from "components/loading-screen";

const DashboardPage = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [user, setUser] = React.useState<firebase.User | {}>({});
  const [theme, setTheme] = React.useState(() => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme");
      return storedTheme || "light";
    }
    return "light";
  });

  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);

    const mode = urlParams.get("mode");

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
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
  }, [router]);

  const domainUrl = "http://localhost:3001/";

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <Layout theme={theme} setTheme={setTheme} user={user} title="Dashboard">
      <Dashboard theme={theme} domainUrl={domainUrl} user={user} />
    </Layout>
  );
};

export default DashboardPage;
