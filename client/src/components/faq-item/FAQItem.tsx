import React, { useEffect, useState } from 'react'
import clsx from 'clsx'

import PlusMinusIcon from 'components/plus-minus-icon'

import stl from './FAQItem.module.scss'

interface Props {
  que: string
  ans: string
  theme: string
}

const FAQItem = ({ que, ans, theme }: Props) => {
  const [expand, setExpand] = useState(false)
  const [className, setClassName] = useState('')

  useEffect(() => {
    if (theme === 'dark') setClassName(stl.darkFAQItem)
    else setClassName('')
  }, [theme])

  return (
    <div className={clsx(stl.faqItem, className)}>
      <div className={stl.header} onClick={() => setExpand(!expand)}>
        <span className={stl.question}>{que}</span>
        <PlusMinusIcon isActive={expand} theme={theme} />
      </div>
      <div className={clsx(stl.answer, expand ? stl.expand : '')}>{ans}</div>
    </div>
  )
}

FAQItem.defaultProps = {
  que: 'Who is Communications Saasimi for?',
  ans: 'Communications Saasimi is for businesses and individuals seeking enhanced communication solutions and engagement tools.',
}

export default FAQItem
