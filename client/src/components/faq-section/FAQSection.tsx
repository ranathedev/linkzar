import React, { useEffect } from "react";
import clsx from "clsx";

import AddIcon from "assets/plus.svg";
import MinusIcon from "assets/minus.svg";

import stl from "./FAQSection.module.scss";

interface Props {
  data: Array<{ que: string; ans: string; id: string }>;
  theme: string;
}

const FAQSection = ({ data, theme }: Props) => {
  const [expand, setExpand] = React.useState("none");
  const [className, setClassName] = React.useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (theme === "dark") {
        setClassName(stl.darkFAQSec);
      } else {
        setClassName("");
      }
    }
  }, [theme]);

  const handleExpand = (id: string) => {
    expand === id ? setExpand("none") : setExpand(id);
  };

  return (
    <section className={clsx(stl.faqSec, className)}>
      <div className={stl.heading}>Frequently Asked Questions</div>
      <ul className={stl.list}>
        {data.map((item, i) => (
          <li
            key={i}
            id={item.id}
            className={expand === item.id ? stl.expand : ""}
          >
            <div className={stl.header}>
              <span className={stl.question}>{item.que}</span>
              <div className={stl.btnContainer}>
                <button
                  className={expand === item.id ? stl.secondary : stl.primary}
                  onClick={() => handleExpand(item.id)}
                >
                  {expand === item.id ? <MinusIcon /> : <AddIcon />}
                </button>
              </div>
            </div>
            <p className={stl.answer}>{item.ans}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

FAQSection.defaultProps = {
  data: [
    {
      que: "What is Lorem Ipsum? What is Lorem Ipsum? What is Lorem Ipsum? What is Lorem Ipsum? What is Lorem Ipsum? What is Lorem Ipsum? What is Lorem Ipsum? What is Lorem Ipsum?",
      ans: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim ducimus vel aspernatur molestias non magni magnam nesciunt quos, debitis nemo id quibusdam modi officiis inventore aut odio sapiente maiores et!",
      id: "question0",
    },
    {
      que: "What is Lorem Ipsum?",
      ans: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim ducimus vel aspernatur molestias non magni magnam nesciunt quos, debitis nemo id quibusdam modi officiis inventore aut odio sapiente maiores et!",
      id: "question1",
    },
    {
      que: "What is Lorem Ipsum?",
      ans: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim ducimus vel aspernatur molestias non magni magnam nesciunt quos, debitis nemo id quibusdam modi officiis inventore aut odio sapiente maiores et!",
      id: "question2",
    },
    {
      que: "What is Lorem Ipsum?",
      ans: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim ducimus vel aspernatur molestias non magni magnam nesciunt quos, debitis nemo id quibusdam modi officiis inventore aut odio sapiente maiores et!",
      id: "question3",
    },
    {
      que: "What is Lorem Ipsum?",
      ans: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim ducimus vel aspernatur molestias non magni magnam nesciunt quos, debitis nemo id quibusdam modi officiis inventore aut odio sapiente maiores et!",
      id: "question4",
    },
    {
      que: "What is Lorem Ipsum?",
      ans: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim ducimus vel aspernatur molestias non magni magnam nesciunt quos, debitis nemo id quibusdam modi officiis inventore aut odio sapiente maiores et!",
      id: "question5",
    },
    {
      que: "What is Lorem Ipsum?",
      ans: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim ducimus vel aspernatur molestias non magni magnam nesciunt quos, debitis nemo id quibusdam modi officiis inventore aut odio sapiente maiores et!",
      id: "question6",
    },
  ],
};

export default FAQSection;
