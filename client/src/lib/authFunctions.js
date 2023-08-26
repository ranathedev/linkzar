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
  setIsLoading
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
              console.log("Verification Email sent!");
            })
            .catch((err) => handleAuthErrs(err));
        })
        .catch((err) => handleAuthErrs(err));
    })
    .catch((err) => {
      handleAuthErrs(err);

      setIsLoading(false);
    });
};

const signinWithEmailPassword = async (email, password) => {
  await signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      await localStorage.setItem("credentials", JSON.stringify(userCredential));
      const user = userCredential.user;
      console.log("User signed in Successfuly!");
      location.href = "/dashboard";
    })
    .catch((err) => handleAuthErrs(err));
};

const signinWithGoogle = async () => {
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
    .catch((err) => handleAuthErrs(err));
};

const signinWithGithub = async () => {
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
    .catch((err) => handleAuthErrs(err));
};

const signinWithMicrosoft = async () => {
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
    .catch((err) => handleAuthErrs(err));
};

const sendVerificationEmail = async (user) => {
  const actionCodeSettings = {
    url: "http://localhost:3000/dashboard",
    handleCodeInApp: true,
  };

  await sendEmailVerification(user, actionCodeSettings)
    .then(() => {
      alert("Verification email sent");
    })
    .catch((err) => handleAuthErrs(err));
};

const sendResetPasswordEmail = async (email) => {
  const actionCodeSettings = {
    url: "http://localhost:3000/auth?type=signin",
    handleCodeInApp: true,
  };
  await sendPasswordResetEmail(auth, email, actionCodeSettings)
    .then(() => {
      console.log("Password reset email sent!");
    })
    .catch((err) => handleAuthErrs(err));
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
      handleAuthErrs(err);

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

          console.log("Verification email sent to:", email);
        })
        .catch((err) => {
          handleAuthErrs(err);

          setShowToast(true);
          setToastOpts({
            variant: "danger",
            msg: "Can't update Email.",
          });
        });
    })
    .catch((err) => {
      if (err.code === "auth/requires-recent-login") {
        console.log("Re-authentication started");
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
                  console.log("Re-authentication done.");
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

                      console.log("Verification email sent to:", email);
                    })
                    .catch((err) => {
                      handleAuthErrs(err);

                      setShowToast(true);
                      setToastOpts({
                        variant: "danger",
                        msg: "Can't update Email.",
                      });
                    });
                })
                .catch((err) => console.log(err));
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
        handleAuthErrs(err);
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

      console.log("Password updated!");
    })
    .catch((err) => {
      if (err.code === "auth/requires-recent-login") {
        console.log("Re-authentication started");
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
                  console.log("Re-authentication done.");
                  const user = result.user;
                  await updatePassword(user, newPassword)
                    .then(() => {
                      setShowToast(true);
                      setToastOpts({
                        variant: "success",
                        msg: "Password updated successfully.",
                      });

                      console.log("Password updated!");
                    })
                    .catch((err) => console.log(err));
                })
                .catch((err) => console.log(err));
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
        handleAuthErrs(err);

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
  await deleteObject(profilePicRef)
    .then(() => console.log("File Deleted Successfully!"))
    .catch((err) => console.log("Error while deleting file:", err));

  const storageRef = ref(storage, `${process.env.BUCKET}/${uid}/profilePic`);

  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
    },
    (error) => {
      console.log(error);
    },
    async () => {
      await getDownloadURL(uploadTask.snapshot.ref)
        .then(async (downloadURL) => {
          console.log("File available at", downloadURL);
          const user = await auth.currentUser;

          await updateProfile(user, { photoURL: downloadURL })
            .then(async () => {
              console.log("Profile updated");
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
              handleAuthErrs(err);

              setShowToast(true);
              setToastOpts({
                variant: "danger",
                msg: "Can't update Profile photo.",
              });
            });
        })
        .catch((err) => {
          handleAuthErrs(err);

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
            msg: "Profile photo deleted.",
          });

          console.log("File Deleted Successfully!");
        })
        .catch((err) => {
          handleAuthErrs(err);

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

const deleteAccount = async (setShowDialog, setDialogOpts) => {
  const user = auth.currentUser;

  await deleteUser(user)
    .then(async () => {
      await axios.post("http://localhost:3001/deleteColl", {
        headers: {
          "Content-Type": "application/json",
        },
        uid: user.uid,
      });

      location.href = "/auth?type=signup";

      await localStorage.removeItem("user");
      await localStorage.removeItem("credentials");

      console.log("Account is deleted.");
    })
    .catch((err) => {
      if (err.code === "auth/requires-recent-login") {
        console.log("Re-authentication started");
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
                  console.log("Re-authentication done.");
                  const user = result.user;
                  await deleteUser(user)
                    .then(async () => {
                      await axios.post("http://localhost:3001/deleteColl", {
                        headers: {
                          "Content-Type": "application/json",
                        },
                        uid: user.uid,
                      });

                      await localStorage.removeItem("user");
                      await localStorage.removeItem("credentials");

                      console.log("Account is deleted.");
                      location.href = "/auth?type=signup";
                    })
                    .catch((err) => console.log(err));
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
        handleAuthErrs(err);
      }
    });
};

const logOut = () => {
  signOut(auth)
    .then(() => console.log("User signed out!"))
    .catch((err) => handleAuthErrs(err));
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
