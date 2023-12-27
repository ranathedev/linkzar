import React, { useEffect } from 'react'
import clsx from 'clsx'

import Button from 'components/button'

import stl from './DialogBox.module.scss'

interface Props {
  theme: string
  isVisible: boolean
  msg: string
  primaryBtnLabel: string
  secondaryBtnLabel: string
  handleAction: () => void
  handleCancel: () => void
}

const DialogBox = ({
  theme,
  isVisible,
  msg,
  primaryBtnLabel,
  secondaryBtnLabel,
  handleAction,
  handleCancel,
}: Props) => {
  const [className, setClassName] = React.useState('')

  useEffect(() => {
    if (theme === 'dark') setClassName(stl.darkDelDialog)
    else setClassName('')
  }, [theme])

  return (
    <div className={clsx(stl.delDialog, isVisible ? stl.show : '', className)}>
      <span>{msg}</span>
      <div className={stl.btnContainer}>
        <Button
          variant="secondary"
          theme={theme}
          label={secondaryBtnLabel}
          handleOnClick={handleCancel}
        />
        <Button
          theme={theme}
          label={primaryBtnLabel}
          handleOnClick={handleAction}
        />
      </div>
    </div>
  )
}

DialogBox.defaultProps = {
  msg: 'Are you sure you want to delete this link?',
  secondaryBtnLabel: 'Cancel',
  primaryBtnLabel: 'Yes, Delete',
}

export default DialogBox
