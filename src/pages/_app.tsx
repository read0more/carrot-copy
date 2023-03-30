import '../styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    // <div className="mx-auto w-full max-w-xl">
    <div className="h-full min-h-screen bg-green-100 py-10">
      <Component {...pageProps} />
    </div>
  );
}
