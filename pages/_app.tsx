import {AppProps} from "next/app";
import {JSX} from "react";
import '../styles/globals.css';

function MyApp({Component, pageProps}: AppProps): JSX.Element {
  return <Component {...pageProps} />;
}

export default MyApp;
