import auth from "./firebase";
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
} from "firebase/auth";
import {
  ref,
  deleteObject,
  uploadBytesResumable,
  getDownloadURL,
  getStorage,
} from "firebase/storage";

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

          await sendEmailVerification(user, actionCodeSettings).then(
            async () => {
              const newObject = { ...user, fname, lname };
              setUser(newObject);
              await localStorage.setItem("user", JSON.stringify(newObject));
              setIsLoading(false);
              console.log(user);
              console.log("Verification Email sent!");
            }
          );
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log("Error Code:", errorCode);
          console.log("Error Message:", errorMessage);
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("Error Code:", errorCode);
      console.log("Error Message:", errorMessage);
      setIsLoading(false);
    });
};

const signinWithEmailPassword = async (email, password) => {
  await signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      await localStorage.setItem("credentials", JSON.stringify(userCredential));
      const user = userCredential.user;
      console.log(user);
      console.log("User signed in Successfuly!");
      location.href = "/dashboard";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("Error Code:", errorCode);
      console.log("Error Message:", errorMessage);
    });
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
        console.log("User :", newObject);
        await localStorage.setItem("user", JSON.stringify(newObject));
      }

      location.href = "/dashboard";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMsg = error.message;

      console.error("Error Code:", errorCode);
      console.error("Error Msg:", errorMsg);
    });
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
        console.log("User :", newObject);
        await localStorage.setItem("user", JSON.stringify(newObject));
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMsg = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);

      console.error("Error Code:", errorCode);
      console.error("Error Msg:", errorMsg);
      console.error("Email :", email);
      console.error("Credential :", credential);
    });
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
        console.log("User :", newObject);
        await localStorage.setItem("user", JSON.stringify(newObject));
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMsg = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);

      console.error("Error Code:", errorCode);
      console.error("Error Msg:", errorMsg);
      console.error("Email :", email);
      console.error("Credential :", credential);
    });
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
    .catch((err) => console.log(err));
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
    .catch((error) => {
      const errorCode = error.code;
      const errorMsg = error.message;

      console.error("Error Code:", errorCode);
      console.error("Error Msg:", errorMsg);
    });
};

const updateName = async (name) => {
  const user = await auth.currentUser;
  await updateProfile(user, {
    displayName: name,
  })
    .then(async () => {
      console.log("Name updated!");
      const user = await auth.currentUser;
      console.log(user);
    })
    .catch((error) => {
      console.log(error);
    });
};

const handleUpdateEmail = async (email) => {
  const actionCodeSettings = {
    url: "http://localhost:3000/settings",
    handleCodeInApp: true,
  };
  await updateEmail(auth.currentUser, email)
    .then(() => {
      const user = auth.currentUser;
      sendEmailVerification(user, actionCodeSettings)
        .then(() => console.log("Verification email sent to:", email))
        .catch((error) => console.log(error));
      console.log("Email updated!");
      console.log(user);
    })
    .catch((error) => {
      console.log(error);
    });
};

const handleUpdatePass = async (newPassword) => {
  const user = auth.currentUser;

  await updatePassword(user, newPassword)
    .then(() => {
      console.log("Password updated!");
    })
    .catch((error) => {
      console.log(error);
    });
};

const updatePhoto = async (e, setUser, setIsLoading) => {
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
            })
            .catch((error) => console.log(error));
        })
        .catch((error) => {
          setIsLoading(false);
          console.log(error);
        });
    }
  );
};

const deletePhoto = async (setUser) => {
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
          console.log("File Deleted Successfully!");
        })
        .catch((error) => console.log(error));
    })
    .catch((err) => console.log("Error while deleting file:", err));
};

const deleteAccount = async () => {
  const user = auth.currentUser;

  await deleteUser(user)
    .then(() => {
      console.log("Account is deleted.");
      location.href = "/auth?type=signup";
      localStorage.removeItem("user");
    })
    .catch((error) => {
      if (error.code === "auth/requires-recent-login") {
        console.log("Sign in again to do this.");
      } else {
        console.log(error);
      }
    });
};

const logOut = () => {
  signOut(auth)
    .then(() => {
      location.href = "/auth?type=signin";
      console.log("User signed out!");
    })
    .catch((error) => console.log(error));
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
