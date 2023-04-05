import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';

export default function App({ Component, pageProps }: AppProps) {
  return (
    // <div className="mx-auto w-full max-w-xl">
    <SWRConfig
      value={{
        fetcher: (url: string) =>
          fetch(url).then((response) => response.json()),
      }}
    >
      <div className="h-full min-h-screen bg-green-100 py-10">
        <Component {...pageProps} />
      </div>
    </SWRConfig>
  );
}
