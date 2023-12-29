import type { AppProps } from 'next/app'
import { Provider, store, persistor, PersistGate } from '../src/store'
import '@/styles/globals.scss'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  )
}
