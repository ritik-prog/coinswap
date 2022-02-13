import '../styles/globals.css'
import { TransactionProvider } from '../context/TransactionContext'
// import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }) {
  return (
    <TransactionProvider>
      <Component {...pageProps} />
    </TransactionProvider>
  )
}

export default MyApp
