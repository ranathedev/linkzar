import React, { useEffect } from "react";
import Link from "next/link";
import clsx from "clsx";

import stl from "./About.module.scss";

interface Props {
  theme: string;
}

const About = ({ theme }: Props) => {
  const [className, setClassName] = React.useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (theme === "dark") {
        setClassName(stl.darkAbout);
      } else {
        setClassName("");
      }
    }
  }, [theme]);
  return (
    <div className={clsx(stl.about, className)}>
      <h1>
        About Linkzar: <span>Empowering Link Sharing with Simplicity</span>
      </h1>
      <section>
        <div>
          <h2>Introduction</h2>
          <p>
            Welcome to Linkzar, your go-to URL Shortener designed to make link
            sharing a breeze. We&apos;re excited to have you on board! Linkzar
            was born out of a passion for streamlining the way we share URLs and
            the belief that simplicity is the key to enhancing online
            experiences.
          </p>
        </div>
        <div>
          <h2>Meet the Creator</h2>
          <p>
            I,&nbsp;
            <Link href="https://linktr.ee/ranaintizar" target="_blank">
              Rana Intizar
            </Link>
            , am the creator and developer behind Linkzar. As a tech enthusiast
            and avid web user, I saw the need for a user-friendly URL shortening
            service that prioritizes speed, efficiency, and security. With a
            strong background in web development, I took it upon myself to bring
            this vision to life.
          </p>
        </div>
        <div>
          <h2>Our Vision</h2>
          <p>
            At Linkzar, we envision a world where sharing links is effortless
            and enjoyable. We strive to provide a service that anyone can use,
            from individuals to businesses, bloggers to developers. Whether
            you&apos;re sharing links with friends, promoting your brand, or
            optimizing your online presence, Linkzar is here to simplify the
            process.
          </p>
        </div>
        <div>
          <h2>Key Features :</h2>
          <ul>
            <li>
              <h3>Swift Shortening</h3>
              <p>
                Experience the lightning-fast URL shortening process that saves
                you time and keeps you productive.
              </p>
            </li>
            <li>
              <h3>Clean and Concise</h3>
              <p>
                Say goodbye to long, clunky URLs and hello to sleek and concise
                short links that are easy to share and remember.
              </p>
            </li>
            <li>
              <h3>Personal Touch</h3>
              <p>
                Customize your short links to add a personal or branded touch to
                your content.
              </p>
            </li>
            <li>
              <h3>Analytics Insights</h3>
              <p>
                Track the performance of your shortened URLs with insightful
                analytics to understand your audience better.
              </p>
            </li>
            <li>
              <h3>Privacy and Reliability</h3>
              <p>Trust that your data and links are safe and secure with us.</p>
            </li>
          </ul>
        </div>
        <div>
          <h2>Get Started</h2>
          <p>
            Start using Linkzar today and elevate your link sharing experience.
            It&apos;s as simple as pasting your long URL and clicking the
            &quot;Shorten URL&quot; button.
          </p>
        </div>
        <div>
          <h2>Contact</h2>
          <p>
            We value your feedback and are dedicated to continuously improving
            Linkzar. If you have any questions, suggestions, or need assistance,
            don&apos;t hesitate to <Link href="/contact">Get in Touch</Link>.
            Your satisfaction is our priority.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
