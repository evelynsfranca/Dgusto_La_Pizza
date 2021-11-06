import '../styles/globals.css';
import 'bootstrap/scss/bootstrap.scss';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Loading from 'src/components/Loading/loading';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [pageLoading, setPageLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => { setPageLoading(true); };
    const handleComplete = () => { setPageLoading(false); };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);
  }, [router]);

  return (
    pageLoading
      ? (<Loading isFullScreen='true'/>)
      : <Component {...pageProps} />
  )

}

export default MyApp;