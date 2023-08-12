import auth from "./firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";

const signupWithEmailPassword = async (fname, email, password) => {
  await createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const user = userCredential.user;
      await updateProfile(user, {
        displayName: fname,
        photoURL: "https://i.postimg.cc/Mp7gnttP/default-Pic.jpg",
      })
        .then(async () => {
          await sendEmailVerification(user).then(() => {
            console.log("Verification Email sent!");
            console.log(user);
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

export { signupWithEmailPassword, signinWithEmailPassword };
