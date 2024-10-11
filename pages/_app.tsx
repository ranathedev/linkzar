import { useEffect, useState } from "react"
import type { AppProps } from "next/app"
import { useRouter } from "next/router"
import { User } from "firebase/auth"

import "@/styles/globals.scss"
import { Provider, store, persistor, PersistGate } from "../src/store"

import IdTokenListener from "components/IdTokenListener"
import UnderMaintenance from "components/under-maintenance"

export default function App({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [theme, setTheme] = useState("light")
  const [showContent, setShowContent] = useState(false)

  const router = useRouter()
  const { mode } = router.query

  useEffect(() => {
    setShowContent(mode === "dev")
  }, [mode])

  if (showContent)
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
  else return <UnderMaintenance />
}
