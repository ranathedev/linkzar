import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import auth from '../lib/firebase'
import { User } from 'firebase/auth'

interface Props {
  setUser: (user: User | null) => void
  setIsLoading: (arg: boolean) => void
  setTheme: (arg: string) => void
}

const IdTokenListener = ({ setUser, setIsLoading, setTheme }: Props) => {
  const theme = useSelector((state: { theme: string }) => state.theme)

  useEffect(() => {
    const unsubscribe = auth.onIdTokenChanged(user => {
      if (user) {
        setUser(user)
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
