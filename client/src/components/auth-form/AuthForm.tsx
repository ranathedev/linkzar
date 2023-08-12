import React, { useEffect } from "react";
import Link from "next/link";
import clsx from "clsx";
import { Formik, Form } from "formik";

import {
  signupWithEmailPassword,
  signinWithEmailPassword,
} from "lib/authFunctions";
import { getFields, getInitVals, socialMethods } from "lib/authFormData";
import InputContainer from "components/input-container";

import TickIcon from "assets/tick.svg";

import stl from "./AuthForm.module.scss";

interface Props {
  theme: string;
  formType: string;
  setFormType: (arg: string) => void;
}

const AuthForm = ({ theme, formType, setFormType }: Props) => {
  const [initVals, setInitVals] = React.useState({
    fname: "",
    email: "",
    pass: "",
  });
  const [className, setClassName] = React.useState("");
  const [isChecked, setIsChecked] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

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
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
    const initVals = getInitVals(formType);

    //@ts-ignore
    setInitVals(initVals);
  }, [formType]);

  return isLoading ? null : (
    <div className={clsx(stl.authForm, className)}>
      <h2 className={stl.heading}>
        {formType === "sign up"
          ? "Create your Free Account"
          : "Log in to your Account"}
      </h2>
      <div className={stl.socialMethod}>
        <span>Sign {formType === "sign up" ? "up" : "in"} with</span>
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
        onSubmit={(values, actions) => {
          if ((formType === "sign up" && isChecked) || formType === "sign in") {
            (formType == "sign up" &&
              signupWithEmailPassword(
                values.fname,
                values.email,
                values.pass
              )) ||
              (formType === "sign in" &&
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
              required={true}
              id={field.id}
              type={field.type}
              label={field.label}
              placeholder={field.placeholder}
            />
          ))}
          {formType === "sign up" ? (
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
              <span>Forgot password?</span>
            </div>
          )}
          <button className={stl.btn} type="submit">
            {formType === "sign up" ? "Create an account" : "Log in"}
          </button>
        </Form>
      </Formik>
      <div className={stl.authSwitch}>
        {formType === "sign up"
          ? "Already have an account? "
          : "Don't have an account yet? "}
        <span
          onClick={() => {
            if (formType === "sign up") {
              setFormType("sign in");
            } else {
              setFormType("sign up");
            }
          }}
        >
          {formType === "sign up" ? "Sign in" : "Sign up for an account"}
        </span>
      </div>
    </div>
  );
};

AuthForm.defaultProps = {
  formType: "sign up",
};

export default AuthForm;
