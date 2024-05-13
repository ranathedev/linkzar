import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { User } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'

import auth, { db } from '../lib/firebase'

interface Props {
  setUser: (user: User | null) => void
  setIsLoading: (arg: boolean) => void
  setTheme: (arg: string) => void
}

const IdTokenListener = ({ setUser, setIsLoading, setTheme }: Props) => {
  const theme = useSelector((state: { theme: string }) => state.theme)

  useEffect(() => {
    const unsubscribe = auth.onIdTokenChanged(async user => {
      if (user) {
        setUser(user)
        try {
          const docRef = doc(db, 'users', user.uid)
          const data = {
            id: user.uid,
            name: user.displayName,
            email: user.email,
            emailVerified: user.emailVerified,
            photoURL: user.photoURL,
            creationTime: user.metadata.creationTime,
          }
          setDoc(docRef, data)
        } catch (error) {}

        getRefreshedToken(user)
      } else setUser(null)

      setTimeout(() => setIsLoading(false), 500)
    })

    localStorage.removeItem('user')

    return () => unsubscribe()
  }, [setUser, setIsLoading])

  useEffect(() => {
    setTheme(theme)
  }, [theme])

  const getRefreshedToken = async (user: User) => await user.getIdToken()

  return null
}

export default IdTokenListener
