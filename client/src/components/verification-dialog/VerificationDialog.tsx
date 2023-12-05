import React, { useEffect, useState } from 'react'
import clsx from 'clsx'

import { sendVerificationEmail } from 'lib/authFunctions'

import Spinner from 'components/spinner'
import Toast from 'components/toast'

import stl from './VerificationDialog.module.scss'

interface Props {
  theme: string
  user: any
}

const VerificationDialog = ({ theme, user }: Props) => {
  const [className, setClassName] = useState('')
  const [loading, setLoading] = useState('')
  const [showToast, setShowToast] = useState(false)
  const [toastOpts, setToastOpts] = useState({ variant: '', msg: '' })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (theme === 'dark') {
        setClassName(stl.darkVerifyDialog)
      } else {
        setClassName('')
      }
    }
  }, [theme])

  const handleResend = async () => {
    setLoading('Sending Verification Email')
    await sendVerificationEmail(user, setShowToast, setToastOpts)
    setLoading('')
  }

  return (
    <div className={clsx(stl.verifyDialog, className)}>
      {loading === '' ? (
        <>
          <Toast
            theme={theme}
            isVisible={showToast}
            setShowToast={setShowToast}
            variant={toastOpts.variant}
            content={toastOpts.msg}
          />
          <p>
            <b>Congratulations!</b>&nbsp;Your account has been created
            successfully. To get started, please check your email inbox and
            click on the verification link we&apos;ve sent you. Once your email
            is verified, you&apos;ll be able to access all the features of our
            app.
          </p>
          <span className={stl.resendContainer}>
            Didn&apos;t get the Verification link?
            <span onClick={handleResend}>Resend</span>
          </span>
        </>
      ) : (
        <div className={stl.loadingContainer}>
          <Spinner taskTitle={loading} variant="secondary" />
        </div>
      )}
    </div>
  )
}

export default VerificationDialog
