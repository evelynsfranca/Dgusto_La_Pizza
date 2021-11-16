import '../styles/globals.css';
import 'bootstrap/scss/bootstrap.scss';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Loading from 'src/components/Loading/loading';
import localStorage from 'localStorage';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [pageLoading, setPageLoading] = useState(false);
  const [cartData, setCartData] = useState([]);
  const [productAddedToCart, setProductAddedToCart] = useState(false);

  useEffect(() => {
    const handleStart = () => { setPageLoading(true); };
    const handleComplete = () => { setPageLoading(false); };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    if (!!localStorage.getItem('cart')) {
      setCartData(JSON.parse(localStorage.getItem('cart')))
    } else {
      localStorage.setItem('cart', JSON.stringify([]))
      setCartData([])
    }

  }, [router]);

  const modifiedPageProps = { ...pageProps, cartData, setCartData, productAddedToCart, setProductAddedToCart }

  return (
    pageLoading
      ? (<Loading isFullScreen='true' />)
      : <Component {...modifiedPageProps} />
  )

}

export default MyApp;