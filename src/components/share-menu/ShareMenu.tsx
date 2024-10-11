import React, { useEffect, useRef } from "react"
import clsx from "clsx"

import useOnClickOutside from "lib/useClickOutside"
import { shareShortUrl } from "lib/utils"

import stl from "./ShareMenu.module.scss"

interface Props {
  theme: string
  isVisible: boolean
  setShowShareMenu: (arg: boolean) => void
  shortId: string
  customClass?: string
}

const ShareMenu = ({
  theme,
  isVisible,
  setShowShareMenu,
  shortId,
  customClass,
}: Props) => {
  const [className, setClassName] = React.useState("")

  const ref = useRef(null)

  useEffect(() => {
    theme === "dark" ? setClassName(stl.darkShareMenu) : setClassName("")
  }, [theme])

  const hideMenu = () => setShowShareMenu(false)

  useOnClickOutside(hideMenu, ref)

  const shareOptions = ["Email", "Twitter", "LinkedIn", "Facebook", "Whatsapp"]

  const handleOnClick = (method: string) => {
    shareShortUrl(method, shortId)
    hideMenu()
  }

  return (
    <div
      ref={ref}
      className={clsx(
        stl.shareMenu,
        className,
        isVisible ? stl.show : "",
        customClass
      )}
    >
      {shareOptions.map(item => (
        <div
          key={item}
          className={stl.item}
          onClick={() => handleOnClick(item)}
        >
          <span>via {item}</span>
        </div>
      ))}
    </div>
  )
}

export default ShareMenu
