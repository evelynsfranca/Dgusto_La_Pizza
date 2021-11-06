import localStorage from 'localStorage';
import Router, { useRouter } from 'next/router';
import LayoutGeneral from 'src/components/Layout/layoutGeneral';
import Loading from 'src/components/Loading/loading';
import StringCrypto from 'string-crypto';

function LogoutPage() {
  const router = useRouter()

  const pass = 'Oh-no,not-again';
  const {
    encryptString,
    decryptString,
  } = new StringCrypto();
  
  const encryptedLocalStorageStringIsAdmin = encryptString('isAdmin', pass);
  const decryptedLocalStorageStringIsAdmin = decryptString(encryptedLocalStorageStringIsAdmin, pass);

  if (typeof window !== undefined && decryptedLocalStorageStringIsAdmin) {
    localStorage.removeItem('isAdmin');
    router.push('/')
  }

  if (typeof window !== undefined && localStorage.getItem('token')) {
    localStorage.removeItem('token');
    router.push('/')
  }

  return (
    <LayoutGeneral pageName="LogoutPage">
      <Loading />
    </LayoutGeneral>
  )
}

export default LogoutPage;