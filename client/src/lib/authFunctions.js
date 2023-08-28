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

const signupWithEmailPassword = async (
  fname,
  lname,
  email,
  password,
  setUser,
  setIsLoading,
  setShowToast,
  setToastOpts
) => {
  setIsLoading(true);
  await createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      await localStorage.setItem("credentials", JSON.stringify(userCredential));
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: fname + " " + lname,
        photoURL: "https://i.postimg.cc/Mp7gnttP/default-Pic.jpg",
      })
        .then(async () => {
          const actionCodeSettings = {
            url: "http://localhost:3000/dashboard",
            handleCodeInApp: true,
          };

          await sendEmailVerification(user, actionCodeSettings)
            .then(async () => {
              const newObject = { ...user, fname, lname };
              setUser(newObject);

              await localStorage.setItem("user", JSON.stringify(newObject));
              await axios.post("http://localhost:3001/createColl", {
                headers: {
                  "Content-Type": "application/json",
                },
                uid: newObject.uid,
              });

              setIsLoading(false);
              setShowToast(true);
              setToastOpts({
                variant: "success",
                msg: `Verification email sent to: ${email}`,
              });
            })
            .catch((err) => handleAuthErrs(err, setShowToast, setToastOpts));
        })
        .catch((err) => handleAuthErrs(err, setShowToast, setToastOpts));
    })
    .catch((err) => {
      handleAuthErrs(err, setShowToast, setToastOpts);

      setIsLoading(false);
    });
};

const signinWithEmailPassword = async (
  email,
  password,
  setShowToast,
  setToastOpts
) => {
  await signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      await localStorage.setItem("credentials", JSON.stringify(userCredential));
      const user = userCredential.user;
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
      await localStorage.setItem("credentials", JSON.stringify(userCredential));
      const user = userCredential.user;
      const userData = userCredential._tokenResponse;

      const existingData = await localStorage.getItem("user");
      if (!existingData) {
        const newObject = {
          ...user,
          fname: userData.firstName,
          lname: userData.lastName,
        };

        await localStorage.setItem("user", JSON.stringify(newObject));
        await axios.post("http://localhost:3001/createColl", {
          headers: {
            "Content-Type": "application/json",
          },
          uid: newObject.uid,
        });
      }

      location.href = "/dashboard";
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
      await localStorage.setItem("credentials", JSON.stringify(userCredential));
      const user = userCredential.user;
      const userData = userCredential._tokenResponse;
      const existingData = await localStorage.getItem("user");
      if (!existingData) {
        const newObject = {
          ...user,
          fname: userData.firstName,
          lname: userData.lastName,
        };

        await localStorage.setItem("user", JSON.stringify(newObject));
        await axios.post("http://localhost:3001/createColl", {
          headers: {
            "Content-Type": "application/json",
          },
          uid: newObject.uid,
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
      await localStorage.setItem("credentials", JSON.stringify(userCredential));
      const user = userCredential.user;
      const userData = userCredential._tokenResponse;
      const existingData = await localStorage.getItem("user");
      if (!existingData) {
        const newObject = {
          ...user,
          fname: userData.firstName,
          lname: userData.lastName,
        };

        await localStorage.setItem("user", JSON.stringify(newObject));
        await axios.post("http://localhost:3001/createColl", {
          headers: {
            "Content-Type": "application/json",
          },
          uid: newObject.uid,
        });
      }
    })
    .catch((err) => handleAuthErrs(err, setShowToast, setToastOpts));
};

const sendVerificationEmail = async (user, setShowToast, setToastOpts) => {
  const actionCodeSettings = {
    url: "http://localhost:3000/dashboard",
    handleCodeInApp: true,
  };

  await sendEmailVerification(user, actionCodeSettings)
    .then(() => {
      alert("Verification email sent");
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
  fname,
  lname,
  setUser,
  setShowToast,
  setToastOpts
) => {
  let displayName;
  if (fname === "") {
    displayName = lname;
  } else if (lname === "") {
    displayName = fname;
  } else {
    displayName = fname + " " + lname;
  }

  const user = await auth.currentUser;
  await updateProfile(user, {
    displayName,
  })
    .then(async () => {
      const existingData = await localStorage.getItem("user");
      const parsedData = JSON.parse(existingData);
      parsedData.fname = fname;
      parsedData.lname = lname;
      parsedData.displayName = displayName;

      setUser(parsedData);

      const updatedData = JSON.stringify(parsedData);
      await localStorage.setItem("user", updatedData);

      const user = auth.currentUser;

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
};

const handleUpdateEmail = async (
  email,
  setUser,
  setShowToast,
  setToastOpts,
  setShowDialog,
  setDialogOpts
) => {
  const user = auth.currentUser;

  await updateEmail(auth.currentUser, email)
    .then(async () => {
      await sendEmailVerification(user)
        .then(async () => {
          const existingData = await localStorage.getItem("user");
          const parsedData = JSON.parse(existingData);
          parsedData.email = email;

          setUser(parsedData);

          const updatedData = JSON.stringify(parsedData);
          await localStorage.setItem("user", updatedData);

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
                      const existingData = await localStorage.getItem("user");
                      const parsedData = JSON.parse(existingData);
                      parsedData.email = email;

                      setUser(parsedData);

                      const updatedData = JSON.stringify(parsedData);
                      await localStorage.setItem("user", updatedData);

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
};

const handleUpdatePass = async (
  newPassword,
  setShowToast,
  setToastOpts,
  setShowDialog,
  setDialogOpts
) => {
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
  const uid = auth.currentUser?.uid;
  const profilePicRef = ref(storage, `${process.env.BUCKET}/${uid}/profilePic`);
  await deleteObject(profilePicRef);

  const storageRef = ref(storage, `${process.env.BUCKET}/${uid}/profilePic`);

  await uploadBytesResumable(storageRef, file);

  await getDownloadURL(uploadTask.snapshot.ref)
    .then(async (downloadURL) => {
      const user = await auth.currentUser;

      await updateProfile(user, { photoURL: downloadURL })
        .then(async () => {
          const existingData = await localStorage.getItem("user");
          const parsedData = JSON.parse(existingData);
          parsedData.photoURL = downloadURL;

          const updatedData = JSON.stringify(parsedData);
          await localStorage.setItem("user", updatedData);

          setUser(parsedData);
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
};

const deletePhoto = async (setUser, setShowToast, setToastOpts) => {
  const uid = auth.currentUser?.uid;
  const profilePicRef = ref(storage, `${process.env.BUCKET}/${uid}/profilePic`);

  await deleteObject(profilePicRef)
    .then(async () => {
      const photoURL = "https://i.postimg.cc/Mp7gnttP/default-Pic.jpg";
      const existingData = await localStorage.getItem("user");
      const parsedData = JSON.parse(existingData);
      parsedData.photoURL = photoURL;

      const updatedData = JSON.stringify(parsedData);
      await localStorage.setItem("user", updatedData);

      await updateProfile(auth.currentUser, { photoURL })
        .then(() => {
          setUser(parsedData);
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

  await deleteUser(user)
    .then(async () => {
      await localStorage.removeItem("user");
      await localStorage.removeItem("credentials");
      await localStorage.removeItem("links");

      location.href = "/auth?type=signup";

      await axios.post("http://localhost:3001/deleteColl", {
        headers: {
          "Content-Type": "application/json",
        },
        uid: user.uid,
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
                  await deleteUser(user)
                    .then(async () => {
                      await localStorage.removeItem("user");
                      await localStorage.removeItem("credentials");
                      await localStorage.removeItem("links");

                      location.href = "/auth?type=signup";

                      await axios.post("http://localhost:3001/deleteColl", {
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
