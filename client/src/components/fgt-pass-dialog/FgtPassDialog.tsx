import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import * as Yup from 'yup'

import { sendResetPasswordEmail } from 'lib/authFunctions'
import Button from 'components/button'
import Toast from 'components/toast'

import ArrowIcon from 'assets/arrow-left.svg'

import stl from './FgtPassDialog.module.scss'

interface Props {
  theme: string
  setResetPass: (arg: boolean) => void
}

const FgtPassDialog = ({ theme, setResetPass }: Props) => {
  const [className, setClassName] = useState('')
  const [email, setEmail] = useState('')
  const [showToast, setShowToast] = useState(false)
  const [toastOpts, setToastOpts] = useState({ variant: '', msg: '' })

  useEffect(() => {
    if (theme === 'dark') setClassName(stl.darkFgtPassDialog)
    else setClassName('')
  }, [theme])

  const handleSubmit = async () => {
    try {
      await Yup.string().email().validate(email)
      sendResetPasswordEmail(email, setShowToast, setToastOpts)
    } catch (error) {
      setShowToast(true)
      setToastOpts({ variant: 'warn', msg: 'Invaild email!' })
    }

    setEmail('')
  }

  return (
    <>
      <Toast
        theme={theme}
        isVisible={showToast}
        setShowToast={setShowToast}
        variant={toastOpts.variant}
        content={toastOpts.msg}
      />
      <div className={clsx(stl.fgtPassDialog, className)}>
        <div className={stl.content}>
          <div className={stl.heading}>Forgot password?</div>
          <span className={stl.headline}>
            No worries, we&apos;ll send you reset instructions.
          </span>
        </div>
        <div className={stl.inputContainer}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            onChange={e => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className={stl.btnContainer}>
          <Button
            theme={theme}
            label="Reset password"
            type="submit"
            handleOnClick={handleSubmit}
          />
          <Button
            theme={theme}
            leftIcon={<ArrowIcon />}
            label="Back to log in"
            variant="secondary"
            handleOnClick={() => setResetPass(false)}
          />
        </div>
      </div>
    </>
  )
}

export default FgtPassDialog
