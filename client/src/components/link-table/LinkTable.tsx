import React, { useEffect, useState } from 'react'
import clsx from 'clsx'

import { getLinks, isMobileDevice } from 'lib/utils'
import TableRow from 'components/table-row'
import SearchBar from 'components/search-bar'
import LoadingSpinner from 'components/loading-spinner'
import Button from 'components/button'
import Modal from 'components/modal'
import URLShortener from 'components/url-shortener'
import Toast from 'components/toast'

import RefreshIcon from 'assets/refresh.svg'
import AddIcon from 'assets/plus.svg'

import stl from './LinkTable.module.scss'

interface Props {
  theme: string
  domainUrl: string
}

interface LinkType {
  _id: string
  shortId: string
  originalURL: string
  createdDate: string
  clickCounts: number
}

const LinkTable = ({ theme, domainUrl }: Props) => {
  const [className, setClassName] = useState('')
  const [listOfLinks, setListOfLinks] = useState<LinkType[]>([])
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [uid, setUid] = useState('')
  const [showToast, setShowToast] = useState(false)
  const [toastOpts, setToastOpts] = useState({ variant: '', msg: '' })
  const [device, setDevice] = useState('')
  const [showFilteredLinks, setShowFilteredLinks] = useState(false)
  const [filteredLinks, setFilteredLinks] = useState<LinkType[]>([])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (theme === 'dark') {
        setClassName(stl.darkLinkTable)
      } else {
        setClassName('')
      }
    }
  }, [theme])

  useEffect(() => {
    const linksData = localStorage.getItem('links')
    if (linksData) {
      //@ts-ignore
      const links = JSON.parse(linksData)
      setListOfLinks(links)
    }

    const data = localStorage.getItem('user')
    //@ts-ignore
    const user = JSON.parse(data)
    const uid = user?.uid
    setUid(uid)

    isMobileDevice() ? setDevice('mobile') : setDevice('')
  }, [])

  const refresh = async () => {
    const links = await getLinks(setIsRefreshing, uid)

    if (!links.err) {
      setListOfLinks(links)
    } else {
      setShowToast(true)
      setToastOpts({ variant: 'danger', msg: "Can't refresh collection." })
    }
  }

  const saveDataToLocalStorage = async (data: any) => {
    await localStorage.setItem('links', JSON.stringify(data))
  }

  const addNewLink = async (newLink: any) => {
    const updatedList = await [...listOfLinks]
    updatedList.unshift(newLink)

    setListOfLinks(updatedList)
    saveDataToLocalStorage(updatedList)
  }

  const removeLink = async (linkId: string) => {
    const updatedList = await listOfLinks.filter(link => link._id !== linkId)

    setTimeout(() => {
      saveDataToLocalStorage(updatedList)
      setListOfLinks(updatedList)
    }, 500)
  }

  const updateLinkInList = async (updatedLink: any) => {
    const updatedListOfLinks = await listOfLinks.map(link =>
      link._id === updatedLink._id ? updatedLink : link
    )

    setListOfLinks(updatedListOfLinks)
    saveDataToLocalStorage(updatedListOfLinks)
  }

  const increaseClickCount = async (linkId: string) => {
    const linkIndex = await listOfLinks.findIndex(link => link._id === linkId)

    if (linkIndex !== -1) {
      const updatedLinks = await [...listOfLinks]

      updatedLinks[linkIndex].clickCounts += 1

      setListOfLinks(updatedLinks)
      saveDataToLocalStorage(updatedLinks)
    }
  }

  const filterLinks = async (keyword: string) => {
    setIsRefreshing(true)
    const filteredArray = listOfLinks.filter(link =>
      link.shortId.includes(keyword)
    )

    setFilteredLinks(filteredArray)
    setShowFilteredLinks(true)
    setIsRefreshing(false)
  }

  const handleCancel = () => {
    setShowFilteredLinks(false)
    setFilteredLinks([])
  }

  return (
    <>
      <Toast
        theme={theme}
        isVisible={showToast}
        setShowToast={setShowToast}
        variant={toastOpts.variant}
        content={toastOpts.msg}
      />
      <Modal
        isVisible={showModal}
        theme={theme}
        dialog={
          <URLShortener
            domainUrl={domainUrl}
            isVisible={showModal}
            sendNewLink={addNewLink}
            setShowModal={setShowModal}
            sendDeleteId={removeLink}
            theme={theme}
            uid={uid}
          />
        }
      />
      <div className={clsx(stl.linkTable, className)}>
        <SearchBar
          theme={theme}
          handleCancel={handleCancel}
          handleSubmit={filterLinks}
        />
        <div className={stl.btn}>
          <Button
            label="Create New"
            leftIcon={<AddIcon />}
            theme={theme}
            handleOnClick={() => setShowModal(true)}
          />
          <div
            className={clsx(stl.refresh, isRefreshing ? stl.animation : '')}
            onClick={refresh}
          >
            <RefreshIcon />
            <span>Refresh</span>
          </div>
        </div>
        <div className={stl.table}>
          <div className={stl.header}>
            <span className={stl.shortLink}>Short Link</span>
            <span className={stl.originalLink}>Original Link</span>
            <span className={stl.clicks}>Clicks</span>
            <span className={stl.date}>Date</span>
            <div className={stl.emptyBox} />
          </div>
          {isRefreshing ? (
            <div className={stl.loadingContainer}>
              <LoadingSpinner loading={isRefreshing} />
            </div>
          ) : (
            <>
              {showFilteredLinks ? (
                filteredLinks.length > 0 ? (
                  filteredLinks.map((linkItem, i) => (
                    <TableRow
                      key={i}
                      domainUrl={domainUrl}
                      theme={theme}
                      sendDeleteId={removeLink}
                      sendUpdatedLinks={updateLinkInList}
                      increaseClickCount={increaseClickCount}
                      linkData={linkItem}
                      uid={uid}
                    />
                  ))
                ) : (
                  <p className={stl.note}>Sorry, No Links Match Your Search</p>
                )
              ) : listOfLinks.length > 0 ? (
                listOfLinks.map((linkItem, i) => (
                  <TableRow
                    key={i}
                    domainUrl={domainUrl}
                    theme={theme}
                    sendDeleteId={removeLink}
                    sendUpdatedLinks={updateLinkInList}
                    increaseClickCount={increaseClickCount}
                    linkData={linkItem}
                    uid={uid}
                  />
                ))
              ) : device === 'mobile' ? (
                <p className={stl.note}>
                  You haven&apos;t added any links yet. Let&apos;s start
                  building your collection. Tap the <b>Create New</b> or{' '}
                  <b>+</b> button to add your first link.
                </p>
              ) : (
                <p className={stl.note}>
                  You haven&apos;t added any links yet. Let&apos;s start
                  building your collection. Click the <b>Create New</b> button
                  to add your first link.
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default LinkTable
