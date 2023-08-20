import React, { useEffect } from "react";
import Link from "next/link";
import clsx from "clsx";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import {
  signupWithEmailPassword,
  signinWithEmailPassword,
  signinWithGoogle,
  signinWithGithub,
  signinWithMicrosoft,
} from "lib/authFunctions";
import { getFields, getInitVals } from "lib/authFormData";
import VerificationDialog from "components/verification-dialog";
import InputContainer from "components/input-container";
import FgtPassDialog from "components/fgt-pass-dialog";
import Spinner from "components/spinner";

import GoogleIcon from "assets/google.svg";
import GithubIcon from "assets/github-2.svg";
import MicrosoftIcon from "assets/microsoft.svg";
import TickIcon from "assets/tick.svg";

import stl from "./AuthForm.module.scss";

interface Props {
  theme: string;
}

const AuthForm = ({ theme }: Props) => {
  const [initVals, setInitVals] = React.useState({
    fname: "",
    lname: "",
    email: "",
    pass: "",
    confirmPass: "",
  });
  const [className, setClassName] = React.useState("");
  const [formType, setFormType] = React.useState("signup");
  const [isChecked, setIsChecked] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [user, setUser] = React.useState(null);
  const [resetPass, setResetPass] = React.useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (theme === "dark") {
        setClassName(stl.darkAuthForm);
      } else {
        setClassName("");
      }
    }
  }, [theme]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    const currentUrl = new URL(location.href);

    if (currentUrl) {
      const type = currentUrl.searchParams.get("type");
      if (type) {
        setFormType(type);
        const initVals = getInitVals(type);
        //@ts-ignore
        setInitVals(initVals);
      }
    }
  }, []);

  const socialMethods = [
    {
      icon: <GoogleIcon />,
      name: "google",
      onClick: signinWithGoogle,
    },
    {
      icon: <GithubIcon />,
      name: "github",
      onClick: signinWithGithub,
    },
    {
      icon: <MicrosoftIcon />,
      name: "twitter",
      onClick: signinWithMicrosoft,
    },
  ];
  const signUpSchema = Yup.object().shape({
    fname: Yup.string().required("First name is required"),
    lname: Yup.string().required("Last name is required"),
    email: Yup.string()
      .email("Email is not valid")
      .required("Email is required"),
    pass: Yup.string()
      .required("Password is required")
      .matches(/(?=.*\d)/, "Password must contain at least 1 digit")
      .matches(/(?=.*[A-Z])/, "Password must contain at least 1 capital letter")
      .matches(
        /(?=.*[a-z])/,
        "Password must contain at least 1 lowercase letter"
      )
      .matches(
        /(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-])/,
        "Password must contain at least 1 special character"
      )
      .min(8, "Password must be at least 8 characters long"),
    confirmPass: Yup.string()
      .required("Confirm your Password")
      //@ts-ignore
      .oneOf([Yup.ref("pass"), null], "Passwords didn't matched")
      .nullable()
      .required("Confirm Password is required"),
  });

  const signInSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email is not valid")
      .required("Email is required"),
  });

  const changeFormType = () => {
    let newType = "";
    if (formType === "signup") {
      newType = "signin";
    } else if (formType === "signin") {
      newType = "signup";
    }

    const currentUrl = new URL(location.href);

    currentUrl.searchParams.set("type", newType);

    window.history.replaceState({}, "", currentUrl.toString());

    location.reload();
  };

  return isLoading ? (
    <Spinner customClass={stl.spinner} />
  ) : resetPass === true ? (
    <FgtPassDialog theme={theme} setResetPass={setResetPass} />
  ) : user === null ? (
    <div className={clsx(stl.authForm, className)}>
      <h2 className={stl.heading}>
        {formType === "signup"
          ? "Create your Free Account"
          : "Log in to your Account"}
      </h2>
      <div className={stl.socialMethod}>
        <span>Sign {formType === "signup" ? "up" : "in"} with</span>
        <div className={stl.btns}>
          {socialMethods.map((item, i) => (
            <button
              key={i}
              className={stl[`${item.name}Btn`]}
              onClick={item.onClick}
            >
              {item.icon}
            </button>
          ))}
        </div>
      </div>
      <div className={stl.divider}>
        <span className={stl.line} />
        <span className={stl.text}>or</span>
        <span className={stl.line} />
      </div>
      <Formik
        initialValues={initVals}
        validationSchema={formType === "signup" ? signUpSchema : signInSchema}
        onSubmit={(values, actions) => {
          if ((formType === "signup" && isChecked) || formType === "signin") {
            (formType === "signup" &&
              signupWithEmailPassword(
                values.fname,
                values.email,
                values.pass,
                setUser,
                setIsLoading
              )) ||
              (formType === "signin" &&
                signinWithEmailPassword(values.email, values.pass));
            actions.resetForm();

            setIsChecked(false);
          } else {
            alert("Agree to our terms and conditions to create account.");
          }
        }}
      >
        <Form>
          {getFields(formType)?.map((field, i) => (
            <InputContainer
              theme={theme}
              key={i}
              id={field.id}
              type={field.type}
              label={field.label}
              placeholder={field.placeholder}
            />
          ))}
          {formType === "signup" ? (
            <div className={stl.checkboxContainer}>
              <span
                className={clsx(stl.checkbox, isChecked ? stl.checked : "")}
                onClick={() => setIsChecked(!isChecked)}
              >
                <TickIcon />
              </span>
              <label htmlFor="agreement">
                I agree to the <Link href="#">terms and conditions</Link>.
              </label>
            </div>
          ) : (
            <div className={stl.forgotPassword}>
              <span onClick={() => setResetPass(true)}>Forgot password?</span>
            </div>
          )}
          <button className={stl.btn} type="submit">
            {formType === "signup" ? "Create an account" : "Log in"}
          </button>
        </Form>
      </Formik>
      <div className={stl.authSwitch}>
        {formType === "signup"
          ? "Already have an account? "
          : "Don't have an account yet? "}
        <span onClick={changeFormType}>
          {formType === "signup" ? "Sign in" : "Sign up for an account"}
        </span>
      </div>
    </div>
  ) : (
    <VerificationDialog theme={theme} user={user} />
  );
};

AuthForm.defaultProps = {
  formType: "signup",
};

export default AuthForm;
