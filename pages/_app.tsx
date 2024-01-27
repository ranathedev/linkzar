import { useState } from 'react'
import type { AppProps } from 'next/app'
import { Provider, store, persistor, PersistGate } from '../src/store'
import '@/styles/globals.scss'
import IdTokenListener from 'components/IdTokenListener'
import { User } from 'firebase/auth'

export default function App({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [theme, setTheme] = useState('light')

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <IdTokenListener
          setUser={setUser}
          setIsLoading={setIsLoading}
          setTheme={setTheme}
        />
        <Component
          {...pageProps}
          user={user}
          isLoading={isLoading}
          theme={theme}
        />
      </PersistGate>
    </Provider>
  )
}
