import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Auth0Provider } from "@auth0/auth0-react";

export default function App({ Component, pageProps }: AppProps) {
  return (<Auth0Provider
    audience="https://inpost-api.example.com"
    domain="dev-c4ln1ujdm122wn5m.us.auth0.com"
    clientId="sM8na2OApEh2mW6VOtBOC0vHGcktGYts"
    redirectUri="http://localhost:3000/MainPage"
  >

    <Component {...pageProps} />

  </Auth0Provider>)


}
