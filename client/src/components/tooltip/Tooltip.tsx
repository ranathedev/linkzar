import React, { useEffect } from 'react'
import clsx from 'clsx'

import stl from './Tooltip.module.scss'

interface Props {
  isVisible: boolean
  theme: string
}

const Tooltip = ({ isVisible, theme }: Props) => {
  const [className, setClassName] = React.useState('')

  useEffect(() => {
    theme === 'dark' ? setClassName(stl.darkTooltip) : setClassName('')
  }, [theme])

  return (
    <div
      className={clsx(stl.tooltip, isVisible ? stl.showTooltip : '', className)}
    >
      Copied!
    </div>
  )
}

Tooltip.defaultProps = {
  isVisible: true,
}

export default Tooltip
