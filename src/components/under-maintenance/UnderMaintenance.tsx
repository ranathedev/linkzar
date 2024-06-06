import React from 'react'
import Image from 'next/image'

import stl from './UnderMaintenance.module.scss'

const UnderMaintenance = () => (
  <div className={stl.underMaintenance}>
    <div className={stl.imgContainer}>
      <a
        title="maintenance icons"
        href="https://www.flaticon.com/free-icons/maintenance"
        target="_blank"
      >
        <Image
          title="Maintenance icons created by Freepik - Flaticon"
          src="/web-maintenance.png"
          width={512}
          height={512}
          alt="Maintenance Icon"
        />
      </a>
    </div>
    <div className={stl.content}>
      <h1>Technical Problems</h1>
      <p>
        We&apos;re currently experiencing technical issues and the site cannot
        be accessed at the moment. Please try again later.
      </p>
    </div>
  </div>
)

export default UnderMaintenance
