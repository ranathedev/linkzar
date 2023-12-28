import React, { useEffect, useRef } from 'react'
import clsx from 'clsx'

import useOnClickOutside from 'lib/useClickOutside'

import stl from './ShareMenu.module.scss'

interface Props {
  theme: string
  isVisible: boolean
  setShowShareMenu: (arg: boolean) => void
  sendViaMethod: (arg: string) => void
  customClass?: string
}

const ShareMenu = ({
  theme,
  isVisible,
  setShowShareMenu,
  sendViaMethod,
  customClass,
}: Props) => {
  const [className, setClassName] = React.useState('')

  const ref = useRef(null)

  useEffect(() => {
    if (theme === 'dark') setClassName(stl.darkShareMenu)
    else setClassName('')
  }, [theme])

  const hideMenu = () => {
    setShowShareMenu(false)
  }

  useOnClickOutside(hideMenu, ref)

  const shareOptions = ['Email', 'Twitter', 'LinkedIn', 'Facebook', 'Whatsapp']

  return (
    <div
      ref={ref}
      className={clsx(
        stl.shareMenu,
        className,
        isVisible ? stl.show : '',
        customClass
      )}
    >
      {shareOptions.map(item => (
        <div
          key={item}
          className={stl.item}
          onClick={() => {
            sendViaMethod(item)
            hideMenu()
          }}
        >
          <span>via {item}</span>
        </div>
      ))}
    </div>
  )
}

export default ShareMenu
