import GoogleIcon from "assets/google.svg";
import GithubIcon from "assets/github-2.svg";
import TwitterIcon from "assets/twitter-2.svg";
import LinkedinIcon from "assets/linkedin-2.svg";

const socialMethods = [
  {
    icon: <GoogleIcon />,
    name: "google",
    onClick: () => console.log(`Signing up with Google...`),
  },
  {
    icon: <GithubIcon />,
    name: "github",
    onClick: () => console.log(`Signing up with Github...`),
  },
  {
    icon: <TwitterIcon />,
    name: "twitter",
    onClick: () => console.log(`Signing up with Twitter...`),
  },
  {
    icon: <LinkedinIcon />,
    name: "linkedin",
    onClick: () => console.log(`Signing up with Linkedin...`),
  },
];

const signup = [
  { label: "First name", id: "fname", placeholder: "John", type: "text" },
  { label: "Last name", id: "lname", placeholder: "Doe", type: "text" },
  {
    label: "Email",
    id: "email",
    placeholder: "johndoe@yourdomain.com",
    type: "email",
  },
  { label: "Password", id: "pass", placeholder: "", type: "password" },
  // for sign up testing
  // {
  //   label: "Confirm password",
  //   id: "confirmPass",
  //   placeholder: "",
  //   type: "password",
  // },
];

const signin = [
  {
    label: "Email",
    id: "email",
    placeholder: "Enter your email",
    type: "email",
  },
  {
    label: "Password",
    id: "pass",
    placeholder: "Your password",
    type: "password",
  },
];

const signupInitVals = {
  fname: "",
  lname: "",
  email: "",
  pass: "",
  // for sign up testing
  // confirmPass: "",
};

const signinInitVals = {
  email: "",
  pass: "",
};

const getFields = (formType) => {
  if (formType === "sign up") {
    return signup;
  } else if (formType === "sign in") {
    return signin;
  }
};

const getInitVals = (formType) => {
  if (formType === "sign up") {
    return signupInitVals;
  } else if (formType === "sign in") {
    return signinInitVals;
  }
};

export { getFields, getInitVals, socialMethods };
