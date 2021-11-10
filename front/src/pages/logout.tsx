import localStorage from 'localStorage';
import { useRouter } from 'next/router';
import LayoutGeneral from 'src/components/Layout/layoutGeneral';
import Loading from 'src/components/Loading/loading';
import StringCrypto from 'string-crypto';

function LogoutPage({ cartData }) {
  const router = useRouter();

  const pass = 'Oh-no,not-again';
  const {
    encryptString,
    decryptString,
  } = new StringCrypto();

  const encryptedLocalStorageStringIsAdmin = encryptString('isAdmin', pass);
  const decryptedLocalStorageStringIsAdmin = decryptString(encryptedLocalStorageStringIsAdmin, pass);

  if (typeof window !== undefined && localStorage.getItem(decryptedLocalStorageStringIsAdmin)) {
    localStorage.removeItem(encryptedLocalStorageStringIsAdmin);
    router.push('/')
  }

  if (typeof window !== undefined && localStorage.getItem('token')) {
    localStorage.removeItem('token');
    router.push('/')
  }

  return (
    <LayoutGeneral pageName="LogoutPage" cartData={cartData}>
      <Loading />
    </LayoutGeneral>
  )
}

export default LogoutPage;