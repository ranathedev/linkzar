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
} from "firebase/auth";

const signupWithEmailPassword = async (
  fname,
  email,
  password,
  setUser,
  setIsLoading
) => {
  setIsLoading(true);
  await createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const user = userCredential.user;
      await updateProfile(user, {
        displayName: fname,
        photoURL: "https://i.postimg.cc/Mp7gnttP/default-Pic.jpg",
      })
        .then(async () => {
          const actionCodeSettings = {
            url: "http://localhost:3000/",
            handleCodeInApp: true,
          };

          await sendEmailVerification(user, actionCodeSettings).then(() => {
            console.log("Verification Email sent!");
            console.log(user);
            setUser(user);
            setIsLoading(false);
          });
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
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("User signed in Successfuly!");
      console.log(user);
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
    .then((result) => {
      const user = result.user;
      console.log("User :", user);
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

const signinWithGithub = async () => {
  const provider = new GithubAuthProvider();
  provider.setCustomParameters({
    prompt: "consent",
  });

  signInWithPopup(auth, provider)
    .then(async (result) => {
      const user = result.user;

      console.log(user);
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
    .then(async (result) => {
      const user = result.user;
      console.log(user);
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
    url: "http://localhost:3000/",
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
    url: "http://localhost:3000/auth",
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

export {
  signupWithEmailPassword,
  signinWithEmailPassword,
  signinWithGoogle,
  signinWithGithub,
  signinWithMicrosoft,
  sendVerificationEmail,
  sendResetPasswordEmail,
};
