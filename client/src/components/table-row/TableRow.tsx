import React, { useEffect, useState } from 'react'
import clsx from 'clsx'

import { formatDate } from 'lib/utils'

import ActionBox from 'components/action-box'
import LinkEditor from 'components/link-editor'
import Modal from 'components/modal'
import Spinner from 'components/spinner'
import Toast from 'components/toast'

import DownIcon from 'assets/chevron-down.svg'

import stl from './TableRow.module.scss'

interface Props {
  domainUrl: string
  linkData: {
    _id: string
    shortId: string
    originalURL: string
    createdDate: string
    clickCounts: number
  }
  theme: string
  sendDeleteId: (arg: string) => void
  sendUpdatedLinks: (arg: any) => void
  increaseClickCount: (arg: string) => void
  uid: string
}

const TableRow = ({
  domainUrl,
  linkData,
  theme,
  sendDeleteId,
  sendUpdatedLinks,
  increaseClickCount,
  uid,
}: Props) => {
  const [expand, setExpand] = useState(false)
  const [className, setClassName] = useState('')
  const [showActionList, setShowActionList] = useState(false)
  const [width, setWidth] = useState(1000)
  const [showModal, setShowModal] = useState(false)
  const [showEditor, setShowEditor] = useState(false)
  const [loading, setLoading] = useState('')
  const [showToast, setShowToast] = useState(false)
  const [toastOpts, setToastOpts] = useState({ variant: '', msg: '' })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (theme === 'dark') setClassName(stl.darkTableRow)
    else setClassName('')
  }, [theme])

  useEffect(() => {
    width > 640 && setExpand(false)
    width < 640 ? setShowActionList(true) : setShowActionList(false)
  }, [width])

  useEffect(() => {
    function measureWidth() {
      setWidth(document.body.clientWidth)
    }
    measureWidth()
    window.addEventListener('resize', measureWidth)
    return () => window.removeEventListener('resize', measureWidth)
  }, [])

  const getResponse = (res: any) => {
    if (!res.err) {
      setShowToast(true)
      setToastOpts({ variant: 'success', msg: 'Link deleted successfully!' })
      sendDeleteId(linkData._id)
      sendUpdatedLinks(res)
    } else {
      setShowToast(true)
      setToastOpts({ variant: 'danger', msg: res.err })
    }

    setShowModal(false)
  }

  const isActionBoxVisible = (val: boolean) => {
    setIsVisible(val)
  }

  return (
    <>
      <Modal
        isVisible={showModal}
        theme={theme}
        dialog={
          loading === '' ? (
            <LinkEditor
              theme={theme}
              linkData={linkData}
              showEditor={showEditor}
              setLoading={setLoading}
              setShowEditor={setShowEditor}
              setShowModal={setShowModal}
              sendResponse={getResponse}
              uid={uid}
            />
          ) : (
            <Spinner taskTitle={loading} />
          )
        }
      />
      <ActionBox
        display={showActionList ? 'inline-flex' : 'none'}
        theme={theme}
        domainUrl={domainUrl}
        variant="secondary"
        linkData={linkData}
        setShowModal={setShowModal}
        setShowEditor={setShowEditor}
        increaseClickCount={increaseClickCount}
        getResponse={getResponse}
        sendVisibility={isActionBoxVisible}
        uid={uid}
      />
      <Toast
        theme={theme}
        isVisible={showToast}
        variant={toastOpts.variant}
        content={toastOpts.msg}
        setShowToast={setShowToast}
      />
      <div
        className={clsx(
          stl.tableRow,
          expand ? stl.expand : '',
          className,
          isVisible ? stl.show : ''
        )}
      >
        <span className={stl.shortLink}>
          <div className={stl.short}>
            <span className={stl.link}>
              <span className={stl.domain}>linkzar.fly.dev/</span>
              <span>{linkData.shortId}</span>
            </span>
          </div>
        </span>
        <span className={stl.divider} />
        <span className={stl.originalLink}>{linkData.originalURL}</span>
        <span className={stl.divider} />
        <span className={stl.clicks}>{linkData.clickCounts}</span>
        <span className={stl.divider} />
        <span className={stl.date}>
          {formatDate(new Date(linkData.createdDate))}
        </span>
        <ActionBox
          display={showActionList ? 'none' : 'inline-flex'}
          theme={theme}
          domainUrl={domainUrl}
          linkData={linkData}
          setShowModal={setShowModal}
          setShowEditor={setShowEditor}
          increaseClickCount={increaseClickCount}
          getResponse={getResponse}
          sendVisibility={isActionBoxVisible}
          uid={uid}
        />
        <span className={stl.expandBtn} onClick={() => setExpand(!expand)}>
          <DownIcon />
        </span>
      </div>
    </>
  )
}

TableRow.defaultProps = {
  linkData: {
    _id: '64dcac9194d3a3336afe917d',
    shortId: 'aftaab',
    originalURL: 'https://www.youtube.com/watch?v=I7EDAR2GRVo',
    clickCounts: 345,
    createdDate: 'Aug-10-2023',
  },
}

export default TableRow
