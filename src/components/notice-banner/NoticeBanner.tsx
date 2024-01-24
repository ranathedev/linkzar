import React from 'react'

import stl from './NoticeBanner.module.scss'

const NoticeBanner = () => {
  return (
    <div className={stl.banner}>
      <p>
        We&apos;re excited to announce that the issue with our web app has been
        successfully resolved! 🎉 You can now enjoy a seamless experience.
      </p>
      <p>
        Thank you for your patience and understanding. If you encounter any
        further issues or have questions, feel free to reach out to us. Shorten
        away!
      </p>
    </div>
  )
}

export default NoticeBanner
