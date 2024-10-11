import React, { useEffect } from "react"
import Link from "next/link"
import clsx from "clsx"

import { qas } from "lib/utils"
import FAQItem from "components/faq-item"

import ErrorIcon from "assets/error.svg"

import stl from "./FAQSection.module.scss"

interface Props {
  theme: string
}

const FAQSection = ({ theme }: Props) => {
  const [className, setClassName] = React.useState("")

  useEffect(() => {
    theme === "dark" ? setClassName(stl.darkFAQSec) : setClassName("")
  }, [theme])

  return (
    <div className={clsx(stl.faqSection, className)}>
      <div className={stl.container}>
        <div className={stl.heading}>Frequently asked questions</div>
        <p className={stl.desc}>
          We have put together some commonly asked questions
        </p>
        <div className={stl.QAContainer}>
          {qas.map(item => (
            <FAQItem
              key={item.id}
              que={item.que}
              ans={item.ans}
              theme={theme}
            />
          ))}
        </div>
        <div className={stl.noteContainer}>
          <span className={stl.icon}>
            <ErrorIcon />
          </span>
          <div className={stl.text}>
            <span>Didn&apos;t find the answer you are looking for?</span>
            <Link href="/contact?mode=dev">Contact our support</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FAQSection
