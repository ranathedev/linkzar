import React from 'react'

import stl from './NoticeBanner.module.scss'

const NoticeBanner = () => {
  return (
    <div className={stl.banner}>
      <p>
        We&apos;re sorry, but our Application is currently experiencing
        technical difficulties. Our team is working hard to resolve the issue
        and get things back to normal as soon as possible. We apologize for any
        inconvenience this may cause.
      </p>
      <p>Please check back later. Thank you for your patience.</p>
    </div>
  )
}

export default NoticeBanner
