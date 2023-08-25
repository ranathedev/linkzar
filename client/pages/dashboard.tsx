import React, { useEffect } from "react";
import { useRouter } from "next/router";
import firebase from "firebase/auth";

import auth from "lib/firebase";
import Dashboard from "components/dashboard";
import Layout from "components/layout";

const DashboardPage = () => {
  const [user, setUser] = React.useState<firebase.User | null>(null);
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
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      if (!user) {
        router.push("/auth?type=signin");
      }
    });

    return () => {
      unsubscribe();
    };
  }, [router]);

  const domainUrl = "http://localhost:3001/";

  return (
    <Layout theme={theme} setTheme={setTheme} title="Dashboard">
      <Dashboard theme={theme} domainUrl={domainUrl} user={user} />
    </Layout>
  );
};

export default DashboardPage;
