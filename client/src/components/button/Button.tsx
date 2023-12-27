import React, { useEffect } from 'react'
import clsx from 'clsx'

import stl from './Button.module.scss'

interface Props {
  label: string
  variant: string
  rightIcon?: React.ReactNode
  leftIcon?: React.ReactNode
  theme: string
  type: 'button' | 'submit' | 'reset'
  isDisabled: boolean
  handleOnClick: () => void
}

const Button = ({
  label,
  variant,
  rightIcon,
  leftIcon,
  theme,
  type,
  isDisabled,
  handleOnClick,
}: Props) => {
  const [className, setClassName] = React.useState('')

  useEffect(() => {
    if (theme === 'dark') setClassName(stl[`dark${variant}Btn`])
    else setClassName('')
  }, [theme, variant])

  return (
    <button
      disabled={isDisabled}
      className={clsx(stl.btn, stl[`${variant}Btn`], className)}
      onClick={handleOnClick}
      type={type}
    >
      {leftIcon && <span>{leftIcon}</span>}
      <span>{label}</span>
      {rightIcon && <span>{rightIcon}</span>}
    </button>
  )
}

Button.defaultProps = {
  label: 'Button',
  variant: 'primary',
  type: 'button',
  isDisabled: false,
  handleOnClick: () => {},
}

export default Button
