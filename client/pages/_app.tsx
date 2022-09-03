import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next';
import { AuthProvider } from "../contexts/authProvider"

function MyApp({ Component, pageProps } : AppProps) {
  return <AuthProvider><Component {...pageProps} /></AuthProvider>
}

export default appWithTranslation(MyApp);
