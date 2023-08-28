import React, { useEffect } from "react";
import { useRouter } from "next/router";
import firebase from "firebase/auth";

import auth from "lib/firebase";
import Dashboard from "components/dashboard";
import Layout from "components/layout";
import LoadingScreen from "components/loading-screen";

const DashboardPage = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [user, setUser] = React.useState<firebase.User | {}>({
    displayName: "John Doe",
  });
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
      setUser({ displayName: "John Doe" });
      if (mode !== "dev") {
        if (!user) {
          location.href = "/auth?type=signin";
        } else if (user) {
          setUser(user);
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
    <Layout theme={theme} setTheme={setTheme} title="Dashboard">
      <Dashboard theme={theme} domainUrl={domainUrl} user={user} />
    </Layout>
  );
};

export default DashboardPage;
