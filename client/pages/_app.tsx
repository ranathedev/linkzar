import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import { Provider, store } from '../src/store'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}
