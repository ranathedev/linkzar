import React, { useEffect } from "react";
import { useRouter } from "next/router";
import firebase from "firebase/auth";

import auth from "lib/firebase";
import Dashboard from "components/dashboard";
import LoadingScreen from "components/loading-screen";
import ToggleThemeBtn from "components/toggle-theme-btn";

export default function DashboardContainer() {
  const [loading, setLoading] = React.useState(true);
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
      setLoading(false);
      if (!user) {
        router.push("/auth");
      }
    });

    return () => {
      unsubscribe();
    };
  }, [router]);

  const domainUrl = "http://localhost:3001/";

  return (
    <main>
      {!loading ? (
        user !== null && (
          <>
            <ToggleThemeBtn
              theme={theme}
              handleOnClick={() =>
                setTheme((prevTheme) =>
                  prevTheme === "light" ? "dark" : "light"
                )
              }
            />
            <Dashboard theme={theme} domainUrl={domainUrl} />
          </>
        )
      ) : (
        <LoadingScreen />
      )}
    </main>
  );
}
