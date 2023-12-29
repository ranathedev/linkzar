import React, { useEffect } from 'react'
import clsx from 'clsx'

import stl from './PlusMinus.module.scss'

interface Props {
  isActive: boolean
  theme: string
}

const PlusMinusIcon = ({ isActive, theme }: Props) => {
  const [className, setClassName] = React.useState('')

  useEffect(() => {
    theme === 'dark' ? setClassName(stl.darkBtn) : setClassName('')
  }, [theme])

  return (
    <div className={clsx(stl.btn, isActive ? stl.active : '', className)} />
  )
}

export default PlusMinusIcon
