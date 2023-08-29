import auth from "./firebase";

const handleAuthErrs = (err, setShowToast, setToastOpts) => {
  const errCode = err.code;
  const errMsg = err.message;

  if (errCode === "auth/user-not-found") {
    setShowToast(true);
    setToastOpts({
      variant: "danger",
      msg: "Sorry, we couldn't find an account associated with this email address. Please make sure you have a registered account or sign up to create a new one.",
    });
  } else if (errCode === "auth/user-token-expired") {
    setShowToast(true);
    setToastOpts({
      variant: "danger",
      msg: "Log In again to perform this action.",
    });
  } else if (errCode === "auth/too-many-requests") {
    setShowToast(true);
    setToastOpts({
      variant: "danger",
      msg: "Too many sign-up attempts from this location. Please try again later.",
    });
  } else if (errCode === "auth/network-request-failed") {
    setShowToast(true);
    setToastOpts({
      variant: "danger",
      msg: "Network request failed. Please check your internet connection and try again.",
    });
  } else if (errCode === "auth/internal-error") {
    setShowToast(true);
    setToastOpts({
      variant: "danger",
      msg: "An internal error occurred. Please try again later or contact support for assistance.",
    });
  } else if (errCode === "auth/user-disabled") {
    setShowToast(true);
    setToastOpts({
      variant: "danger",
      msg: "Sorry, your account has been disabled. Please contact our support team for assistance.",
    });
  } else if (errCode === "auth/email-already-in-use") {
    setShowToast(true);
    setToastOpts({
      variant: "danger",
      msg: "Error: The email is already in use. Please log in or use a different email.",
    });
  } else if (errCode === "auth/wrong-password") {
    setShowToast(true);
    setToastOpts({ variant: "danger", msg: "Incorrect Password." });
  } else if (errCode === "auth/popup-closed-by-user") {
    setShowToast(true);
    setToastOpts({
      variant: "danger",
      msg: "Sign-in popup was closed. If you'd like to continue signing in, please try again.",
    });
  } else if (errCode === "auth/cancelled-popup-request") {
    setShowToast(true);
    setToastOpts({
      variant: "danger",
      msg: "Sign-in request was cancelled. If you'd like to continue signing in, please try again.",
    });
  } else if (errCode === "auth/provider-already-linked") {
    setShowToast(true);
    setToastOpts({
      variant: "danger",
      msg: "This account is already linked with the selected provider. You can sign in using the linked provider or try a different one.",
    });
  } else if (errCode === "auth/account-exists-with-different-credential") {
    setShowToast(true);
    setToastOpts({
      variant: "danger",
      msg: "An account already exists with the same email address but using a different sign-in method. Please sign in using the same method you used previously.",
    });
  } else if (errCode === "web-storage-unsupported") {
    setShowToast(true);
    setToastOpts({
      variant: "danger",
      msg: "Your browser does not support the required web storage feature for signing in. Please try using a different browser or device.",
    });
  } else if (errCode === "ERR_NETWORK") {
    setShowToast(true);
    setToastOpts({
      variant: "danger",
      msg: "Network Error",
    });
  } else {
    console.error("Error Code:", errCode);
    console.error("Error Msg:", errMsg);
  }
};

export default handleAuthErrs;
