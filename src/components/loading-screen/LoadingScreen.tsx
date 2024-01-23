import React from 'react'

import Spinner from 'components/spinner'

import stl from './LoadingScreen.module.scss'

const LoadingScreen = () => (
  <div className={stl.loadingScreen}>
    <Spinner customClass={stl.spinner} />
  </div>
)

export default LoadingScreen
