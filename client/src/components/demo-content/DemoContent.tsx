import React, { useEffect } from "react";
import Link from "next/link";
import clsx from "clsx";

import stl from "./DemoContent.module.scss";

interface Props {
  theme: string;
}

const DemoContent = ({ theme }: Props) => {
  const [className, setClassName] = React.useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (theme === "dark") {
        setClassName(stl.darkDemoContent);
      } else {
        setClassName("");
      }
    }
  }, [theme]);

  return (
    <div className={clsx(stl.demoContent, className)}>
      <h1>
        Welcome to <span>Linkzar</span> Demo
      </h1>
      <section>
        <div>
          <p>
            In this interactive demo, you can experience the power of our link
            shortener tool. Create short links for your favorite websites and
            easily share them with others. Whether you&apos;re sharing articles,
            blog posts, or fun cat videos, our link shortener makes it quick and
            convenient.
          </p>
        </div>
        <div>
          <h2>Key Features :</h2>
          <ul>
            <li>
              <h3>Create Short Links</h3>
              <p>
                Use our intuitive interface to create short links for your URLs.
                Simply paste the long URL, and our tool will generate a short
                and shareable link.
              </p>
            </li>
            <li>
              <h3>Limited Demo</h3>
              <p>
                To give you a taste of the link shortener&apos;s capabilities,
                we&apos;ve limited the demo to allow you to create up to{" "}
                <b>3 (three)</b> short links. If you&apos;re excited to create
                more links and keep track of them, consider{" "}
                <Link href="/auth?type=signup">Signing Up</Link> for a full
                account.
              </p>
            </li>
            <li>
              <h3>Easy Sharing</h3>
              <p>
                Share your short links on social media, in emails, or anywhere
                you want. Our tool ensures that your links are easy to remember
                and share.
              </p>
            </li>
            <li>
              <h3>Track Your Links</h3>
              <p>
                With a registered account, you can create an unlimited number of
                short links and gain access to advanced features. Keep track of
                the links you&apos;ve created, monitor click statistics, and get
                insights into your link engagement.
              </p>
            </li>
          </ul>
        </div>
        <div>
          <h2>A Note for You:</h2>
          <p>
            This demo showcases the basic functionality of our link shortener.
            To fully explore the tool&apos;s capabilities and enjoy the benefits
            of unlimited link creation and tracking, we encourage you to
            register for an account.{" "}
            <Link href="/auth?type=signup">Sign Up</Link> today to take your
            link sharing to the next level!
          </p>
        </div>
        <div>
          <h2 />
          <p>
            We hope you enjoy exploring our link shortener demo. Feel free to
            reach out if you have any questions or feedback. Happy link sharing!
          </p>
        </div>
      </section>
    </div>
  );
};

export default DemoContent;
