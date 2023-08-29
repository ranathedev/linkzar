import React, { useEffect } from "react";
import { useRouter } from "next/router";
import firebase from "firebase/auth";

import auth from "lib/firebase";
import Layout from "components/layout";
import AvatarHandler from "components/avatar-handler";
import UserInfoSettings from "components/user-info-settings";
import LoadingScreen from "components/loading-screen";
import VerificationDialog from "components/verification-dialog";

import stl from "./index.module.scss";

const SettingsPage = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isVerified, setIsVerified] = React.useState(false);
  const [user, setUser] = React.useState<firebase.User | {}>({
    fname: "John",
    lname: "Doe",
    email: "johndoe@gmail.com",
    displayName: "John Doe",
    photoURL: "https://i.postimg.cc/Mp7gnttP/default-Pic.jpg",
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
  }, [router]);

  return isLoading ? (
    <LoadingScreen />
  ) : isVerified ? (
    <Layout theme={theme} setTheme={setTheme} user={user} title="Settings">
      <div className={stl.settings}>
        <div className={stl.container}>
          <AvatarHandler
            theme={theme}
            customClass={stl.avatarHandler}
            user={user}
            setUser={setUser}
          />
          <div className={stl.wrapper}>
            <UserInfoSettings theme={theme} user={user} setUser={setUser} />
          </div>
        </div>
      </div>
    </Layout>
  ) : (
    <Layout theme={theme} setTheme={setTheme} user={user} title="Verify">
      <div className={stl.verification}>
        <VerificationDialog theme={theme} user={user} />
      </div>
    </Layout>
  );
};

export default SettingsPage;
