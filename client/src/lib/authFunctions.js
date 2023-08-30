import axios from "axios";
import auth from "./firebase";
import firebase from "firebase/app";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  OAuthProvider,
  sendPasswordResetEmail,
  updateEmail,
  signOut,
  updatePassword,
  deleteUser,
  reauthenticateWithPopup,
} from "firebase/auth";
import {
  ref,
  deleteObject,
  uploadBytesResumable,
  getDownloadURL,
  getStorage,
} from "firebase/storage";
import handleAuthErrs from "./handleAuthErrs";

const storage = getStorage();

const actionCodeSettings = {
  url: "http://localhost:3000/dashboard",
  handleCodeInApp: true,
};

const domainUrl = "http://localhost:3000/";

const signupWithEmailPassword = async (
  fname,
  lname,
  email,
  password,
  setIsLoading,
  setShowToast,
  setToastOpts
) => {
  setIsLoading(true);
  await createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: fname + " " + lname,
        photoURL: "https://i.postimg.cc/Mp7gnttP/default-Pic.jpg",
      })
        .then(async () => {
          await localStorage.setItem("user", JSON.stringify(user));

          const data = localStorage.getItem("demoLinks");

          await sendEmailVerification(user, actionCodeSettings)
            .then(async () => {
              setShowToast(true);
              setToastOpts({
                variant: "success",
                msg: `Verification email sent to: ${email}`,
              });

              setIsLoading(false);
            })
            .catch((err) => handleAuthErrs(err, setShowToast, setToastOpts));

          location.href = "/dashboard";

          if (data) {
            localStorage.setItem("links", data);
            const originalArray = JSON.parse(data);
            const demoLinks = originalArray.reverse();

            await axios.post(`${domainUrl}demoLinks`, {
              headers: {
                "Content-Type": "application/json",
              },
              uid: user.uid,
              demoLinks,
            });
          } else {
            const links = [];
            localStorage.setItem("links", JSON.stringify(links));

            await axios.post(`${domainUrl}createColl`, {
              headers: {
                "Content-Type": "application/json",
              },
              uid: user.uid,
            });
          }
        })
        .catch((err) => handleAuthErrs(err, setShowToast, setToastOpts));
    })
    .catch((err) => handleAuthErrs(err, setShowToast, setToastOpts));

  setIsLoading(false);
};

const signinWithEmailPassword = async (
  email,
  password,
  setShowToast,
  setToastOpts
) => {
  await signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const user = userCredential.user;
      await localStorage.setItem("user", JSON.stringify(user));
      location.href = "/dashboard";
    })
    .catch((err) => handleAuthErrs(err, setShowToast, setToastOpts));
};

const signinWithGoogle = async (setShowToast, setToastOpts) => {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: "consent",
  });

  await signInWithPopup(auth, provider)
    .then(async (userCredential) => {
      const user = userCredential.user;

      await localStorage.setItem("user", JSON.stringify(user));

      const data = localStorage.getItem("demoLinks");

      location.href = "/dashboard";

      if (!user.emailVerified) {
        await sendEmailVerification(user, actionCodeSettings)
          .then(async () => {
            setShowToast(true);
            setToastOpts({
              variant: "success",
              msg: `Verification email sent to: ${email}`,
            });

            setIsLoading(false);
          })
          .catch((err) => handleAuthErrs(err, setShowToast, setToastOpts));
      }

      if (data) {
        localStorage.setItem("links", data);
        const originalArray = JSON.parse(data);
        const demoLinks = originalArray.reverse();

        await axios.post(`${domainUrl}demoLinks`, {
          headers: {
            "Content-Type": "application/json",
          },
          uid: user.uid,
          demoLinks,
        });
      } else {
        const links = [];
        localStorage.setItem("links", JSON.stringify(links));

        await axios.post(`${domainUrl}createColl`, {
          headers: {
            "Content-Type": "application/json",
          },
          uid: user.uid,
        });
      }
    })
    .catch((err) => handleAuthErrs(err, setShowToast, setToastOpts));
};

const signinWithGithub = async (setShowToast, setToastOpts) => {
  const provider = new GithubAuthProvider();
  provider.setCustomParameters({
    prompt: "consent",
  });

  signInWithPopup(auth, provider)
    .then(async (userCredential) => {
      const user = userCredential.user;

      await localStorage.setItem("user", JSON.stringify(user));

      const data = localStorage.getItem("demoLinks");

      location.href = "/dashboard";

      if (!user.emailVerified) {
        await sendEmailVerification(user, actionCodeSettings)
          .then(async () => {
            setShowToast(true);
            setToastOpts({
              variant: "success",
              msg: `Verification email sent to: ${email}`,
            });

            setIsLoading(false);
          })
          .catch((err) => handleAuthErrs(err, setShowToast, setToastOpts));
      }

      if (data) {
        localStorage.setItem("links", data);
        const originalArray = JSON.parse(data);
        const demoLinks = originalArray.reverse();

        await axios.post(`${domainUrl}demoLinks`, {
          headers: {
            "Content-Type": "application/json",
          },
          uid: user.uid,
          demoLinks,
        });
      } else {
        const links = [];
        localStorage.setItem("links", JSON.stringify(links));

        await axios.post(`${domainUrl}createColl`, {
          headers: {
            "Content-Type": "application/json",
          },
          uid: user.uid,
        });
      }
    })
    .catch((err) => handleAuthErrs(err, setShowToast, setToastOpts));
};

const signinWithMicrosoft = async (setShowToast, setToastOpts) => {
  const provider = new OAuthProvider("microsoft.com");

  provider.setCustomParameters({
    prompt: "consent",
    tenant: "6b2aaabf-fc70-42aa-bf76-c493c61263fc",
  });
  signInWithPopup(auth, provider)
    .then(async (userCredential) => {
      const user = userCredential.user;

      await localStorage.setItem("user", JSON.stringify(user));

      const data = localStorage.getItem("demoLinks");

      location.href = "/dashboard";

      if (!user.emailVerified) {
        await sendEmailVerification(user, actionCodeSettings)
          .then(async () => {
            setShowToast(true);
            setToastOpts({
              variant: "success",
              msg: `Verification email sent to: ${email}`,
            });

            setIsLoading(false);
          })
          .catch((err) => handleAuthErrs(err, setShowToast, setToastOpts));
      }

      if (data) {
        localStorage.setItem("links", data);
        const originalArray = JSON.parse(data);
        const demoLinks = originalArray.reverse();

        await axios.post(`${domainUrl}demoLinks`, {
          headers: {
            "Content-Type": "application/json",
          },
          uid: user.uid,
          demoLinks,
        });
      } else {
        const links = [];
        localStorage.setItem("links", JSON.stringify(links));

        await axios.post(`${domainUrl}createColl`, {
          headers: {
            "Content-Type": "application/json",
          },
          uid: user.uid,
        });
      }
    })
    .catch((err) => handleAuthErrs(err, setShowToast, setToastOpts));
};

const sendVerificationEmail = async (user, setShowToast, setToastOpts) => {
  await sendEmailVerification(user, actionCodeSettings)
    .then(() => {
      setShowToast(true);
      setToastOpts({ variant: "success", msg: "Verification Email sent!" });
    })
    .catch((err) => handleAuthErrs(err, setShowToast, setToastOpts));
};

const sendResetPasswordEmail = async (email, setShowToast, setToastOpts) => {
  const actionCodeSettings = {
    url: "http://localhost:3000/auth?type=signin",
    handleCodeInApp: true,
  };
  await sendPasswordResetEmail(auth, email, actionCodeSettings)
    .then(() => {
      setShowToast(true);
      setToastOpts({
        variant: "success",
        msg: `Password reset email sent to: ${email}`,
      });
    })
    .catch((err) => handleAuthErrs(err, setShowToast, setToastOpts));
};

const updateName = async (
  name,
  setUser,
  setShowToast,
  setToastOpts,
  setLoading
) => {
  setLoading("Updaing Name");

  const user = await auth.currentUser;
  await updateProfile(user, {
    displayName: name,
  })
    .then(async () => {
      const existingData = localStorage.getItem("user");
      const parsedData = JSON.parse(existingData);
      parsedData.displayName = name;
      const updatedData = JSON.stringify(parsedData);

      setUser(parsedData);
      await localStorage.setItem("user", JSON.stringify(updatedData));

      setShowToast(true);
      setToastOpts({
        variant: "success",
        msg: "Name updated successfully.",
      });
    })
    .catch((err) => {
      handleAuthErrs(err, setShowToast, setToastOpts);

      setShowToast(true);
      setToastOpts({
        variant: "danger",
        msg: "Can't update Name.",
      });
    });

  setLoading("");
};

const handleUpdateEmail = async (
  email,
  setUser,
  setShowToast,
  setToastOpts,
  setShowDialog,
  setDialogOpts,
  setLoading
) => {
  setLoading("Updating Email");

  const user = await auth.currentUser;
  await updateEmail(user, email)
    .then(async () => {
      await sendEmailVerification(user)
        .then(async () => {
          const existingData = localStorage.getItem("user");
          const parsedData = JSON.parse(existingData);
          parsedData.email = email;
          const updatedData = JSON.stringify(updatedData);

          await localStorage.setItem("user", JSON.stringify(updatedData));
          setUser(parsedData);

          setShowToast(true);
          setToastOpts({
            variant: "success",
            msg: "Email updated successfully.",
          });
        })
        .catch((err) => {
          handleAuthErrs(err, setShowToast, setToastOpts);

          setShowToast(true);
          setToastOpts({
            variant: "danger",
            msg: "Can't update Email.",
          });
        });
    })
    .catch((err) => {
      if (err.code === "auth/requires-recent-login") {
        if (user !== null) {
          user.providerData.forEach(async (profile) => {
            const providerId = profile.providerId;

            let provider;
            if (providerId === "google.com") {
              provider = new GoogleAuthProvider();
            } else if (providerId === "github.com") {
              provider = new GithubAuthProvider();
            } else if (providerId === "microsoft.com") {
              provider = new OAuthProvider("microsoft.com");
            }

            if (providerId !== "password") {
              await reauthenticateWithPopup(user, provider)
                .then(async (result) => {
                  const user = result.user;
                  await sendEmailVerification(user)
                    .then(async () => {
                      await localStorage.setItem("user", JSON.stringify(user));
                      setUser(user);

                      setShowToast(true);
                      setToastOpts({
                        variant: "success",
                        msg: "Email updated successfully.",
                      });
                    })
                    .catch((err) => {
                      handleAuthErrs(err, setShowToast, setToastOpts);

                      setShowToast(true);
                      setToastOpts({
                        variant: "danger",
                        msg: "Can't update Email.",
                      });
                    });
                })
                .catch((err) => console.log("Error:", err));
            }

            if (providerId === "password") {
              setShowDialog(true);
              setDialogOpts({
                primaryBtnLabel: "Go to Log In",
                msg: "You will have to log in again to perform this action.",
                handleAction: () => (location.href = "/auth?type=signin"),
              });
            }
          });
        }
      } else {
        handleAuthErrs(err, setShowToast, setToastOpts);
      }
    });

  setLoading("");
};

const handleUpdatePass = async (
  newPassword,
  setShowToast,
  setToastOpts,
  setShowDialog,
  setDialogOpts,
  setLoading
) => {
  setLoading("Updating Password");

  const user = auth.currentUser;
  await updatePassword(user, newPassword)
    .then(() => {
      setShowToast(true);
      setToastOpts({
        variant: "success",
        msg: "Password updated successfully.",
      });
    })
    .catch((err) => {
      if (err.code === "auth/requires-recent-login") {
        if (user !== null) {
          user.providerData.forEach(async (profile) => {
            const providerId = profile.providerId;

            let provider;
            if (providerId === "google.com") {
              provider = new GoogleAuthProvider();
            } else if (providerId === "github.com") {
              provider = new GithubAuthProvider();
            } else if (providerId === "microsoft.com") {
              provider = new OAuthProvider("microsoft.com");
            }
            if (providerId !== "password") {
              await reauthenticateWithPopup(user, provider)
                .then(async (result) => {
                  const user = result.user;
                  await updatePassword(user, newPassword)
                    .then(() => {
                      setShowToast(true);
                      setToastOpts({
                        variant: "success",
                        msg: "Password updated successfully.",
                      });
                    })
                    .catch((err) =>
                      handleAuthErrs(err, setShowToast, setToastOpts)
                    );
                })
                .catch((err) => console.log("Error:", err));
            }

            if (providerId === "password") {
              setDialogOpts({
                primaryBtnLabel: "Go to Log In",
                msg: "You will have to log in again to perform this action.",
                handleAction: () => (location.href = "/auth?type=signin"),
              });
              setShowDialog(true);
            }
          });
        }
      } else {
        handleAuthErrs(err, setShowToast, setToastOpts);

        setShowToast(true);
        setToastOpts({
          variant: "danger",
          msg: "Can't update Password.",
        });
      }
    });

  setLoading("");
};

const updatePhoto = async (
  e,
  setUser,
  setIsLoading,
  setShowToast,
  setToastOpts
) => {
  setIsLoading(true);
  const file = e.target.files[0];
  const user = await auth.currentUser;
  const uid = user.uid;
  const profilePicRef = ref(storage, `${process.env.BUCKET}/${uid}/profilePic`);
  await deleteObject(profilePicRef)
    .then(() => {})
    .catch((err) => {});

  const storageRef = ref(storage, `${process.env.BUCKET}/${uid}/profilePic`);

  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    },
    (error) => {},
    async () => {
      await getDownloadURL(uploadTask.snapshot.ref)
        .then(async (downloadURL) => {
          await updateProfile(auth.currentUser, { photoURL: downloadURL })
            .then(async () => {
              const existingData = await localStorage.getItem("user");
              const parsedData = JSON.parse(existingData);
              parsedData.photoURL = downloadURL;
              const updatedData = JSON.stringify(parsedData);

              setUser(parsedData);
              await localStorage.setItem("user", updatedData);

              setIsLoading(false);
              setShowToast(true);
              setToastOpts({
                variant: "success",
                msg: "Profile photo updated.",
              });
            })
            .catch((err) => {
              handleAuthErrs(err, setShowToast, setToastOpts);

              setShowToast(true);
              setToastOpts({
                variant: "danger",
                msg: "Can't update Profile photo.",
              });
            });
        })
        .catch((err) => {
          handleAuthErrs(err, setShowToast, setToastOpts);

          setIsLoading(false);
          setShowToast(true);
          setToastOpts({
            variant: "danger",
            msg: "Can't update Profile photo.",
          });
        });
    }
  );
};

const deletePhoto = async (setUser, setShowToast, setToastOpts) => {
  const user = await auth.currentUser;
  const uid = user.uid;
  const profilePicRef = ref(storage, `${process.env.BUCKET}/${uid}/profilePic`);

  await deleteObject(profilePicRef)
    .then(async () => {
      const photoURL = "https://i.postimg.cc/Mp7gnttP/default-Pic.jpg";

      await updateProfile(user, { photoURL })
        .then(() => {
          const existingData = localStorage.getItem("user");
          const parsedData = JSON.parse(existingData);
          parsedData.photoURL = photoURL;
          const updatedData = JSON.stringify(updatedData);

          setUser(parsedData);
          localStorage.setItem("user", JSON.stringify(updatedData));

          setShowToast(true);
          setToastOpts({
            variant: "success",
            msg: "Profile photo removed.",
          });
        })
        .catch((err) => {
          handleAuthErrs(err, setShowToast, setToastOpts);

          setShowToast(true);
          setToastOpts({
            variant: "danger",
            msg: "Can't update Profile photo.",
          });
        });
    })
    .catch((err) => {
      setShowToast(true);
      setToastOpts({
        variant: "danger",
        msg: "Can't update Profile photo.",
      });
    });
};

const deleteAccount = async (
  setShowDialog,
  setDialogOpts,
  setShowToast,
  setToastOpts
) => {
  const user = await auth.currentUser;

  await axios
    .post(`${domainUrl}deleteColl`, {
      headers: {
        "Content-Type": "application/json",
      },
      uid: user.uid,
    })
    .then(async () => {
      await deleteUser(user)
        .then(async () => {
          await localStorage.removeItem("user");
          await localStorage.removeItem("links");

          location.href = "/auth?type=signup";
        })

        .catch((err) => {
          if (err.code === "auth/requires-recent-login") {
            if (user !== null) {
              user.providerData.forEach(async (profile) => {
                const providerId = profile.providerId;

                let provider;
                if (providerId === "google.com") {
                  provider = new GoogleAuthProvider();
                } else if (providerId === "github.com") {
                  provider = new GithubAuthProvider();
                } else if (providerId === "microsoft.com") {
                  provider = new OAuthProvider("microsoft.com");
                }

                if (providerId !== "password") {
                  await reauthenticateWithPopup(user, provider)
                    .then(async (result) => {
                      const user = result.user;
                      await deleteUser(user)
                        .then(async () => {
                          await localStorage.removeItem("user");
                          await localStorage.removeItem("links");

                          location.href = "/auth?type=signup";

                          await axios.post(`${domainUrl}deleteColl`, {
                            headers: {
                              "Content-Type": "application/json",
                            },
                            uid: user.uid,
                          });
                        })
                        .catch((err) =>
                          handleAuthErrs(err, setShowToast, setToastOpts)
                        );
                    })
                    .catch((err) => console.log("Error:", err));
                }

                if (providerId === "password") {
                  setDialogOpts({
                    primaryBtnLabel: "Go to Log In",
                    msg: "You will have to Log In again to perform this action.",
                    handleAction: () => (location.href = "/auth?type=signin"),
                  });
                  setShowDialog(true);
                }
              });
            }
          } else {
            handleAuthErrs(err, setShowToast, setToastOpts);
          }
        });
    })
    .catch((err) => {
      setShowToast(true);
      setToastOpts({
        variant: "danger",
        msg: "Can't delete account. Try again.",
      });
    });
};

const logOut = (setShowToast, setToastOpts) => {
  signOut(auth)
    .then(() => (location.href = "/auth?type=signup"))
    .catch((err) => handleAuthErrs(err, setShowToast, setToastOpts));
};

export {
  signupWithEmailPassword,
  signinWithEmailPassword,
  signinWithGoogle,
  signinWithGithub,
  signinWithMicrosoft,
  sendVerificationEmail,
  sendResetPasswordEmail,
  updateName,
  handleUpdateEmail,
  handleUpdatePass,
  updatePhoto,
  deletePhoto,
  deleteAccount,
  logOut,
};
