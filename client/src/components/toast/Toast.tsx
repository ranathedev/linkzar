import React, { useEffect } from 'react'
import clsx from 'clsx'

import CheckIcon from 'assets/check.svg'
import CrossIcon from 'assets/cross.svg'
import WarnIcon from 'assets/alert.svg'
import CloseIcon from 'assets/close.svg'

import stl from './Toast.module.scss'

interface Props {
  content: string
  variant: string
  icon?: React.ReactNode
  isVisible: boolean
  dismissTime: number
  theme: string
  setShowToast: (arg: boolean) => void
}

const Toast = ({
  content,
  variant,
  icon,
  isVisible,
  dismissTime,
  theme,
  setShowToast,
}: Props) => {
  const [className, setClassName] = React.useState('')

  useEffect(() => {
    if (theme === 'dark') setClassName(stl.darkToast)
    else setClassName('')
  }, [theme])

  useEffect(() => {
    const ms = dismissTime * 1000
    if (isVisible) {
      setTimeout(() => {
        setShowToast(false)
      }, ms)
    }
  }, [isVisible, dismissTime])

  return (
    <div
      className={clsx(stl.toast, className, isVisible ? stl.show : stl.hide)}
    >
      <div className={clsx(stl.iconContainer, stl[variant])}>
        {(icon && icon) ||
          (variant === 'success' && <CheckIcon />) ||
          (variant === 'danger' && <CrossIcon />) ||
          (variant === 'warn' && <WarnIcon />)}
      </div>
      <div className={stl.content}>{content}</div>
      <button className={stl.closeBtn} onClick={() => setShowToast(false)}>
        <CloseIcon />
      </button>
      <div
        style={{ animationDuration: `${dismissTime}s` }}
        className={clsx(stl.progressBar, stl[`${variant}ProgressBar`])}
      />
    </div>
  )
}

Toast.defaultProps = {
  content: 'Item moved successfully.',
  variant: 'success',
  isVisible: false,
  dismissTime: 5,
}

export default Toast
