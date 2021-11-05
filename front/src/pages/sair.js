import LayoutGeneral from '../components/Layout/layoutGeneral';
import localStorage from 'localStorage';
import Loading from '../components/Loading/loading';
import Router, { useRouter } from 'next/router';

function LogoutPage() {
  const router = useRouter()

  if (typeof window !== undefined && localStorage.getItem('isAdmin')) {
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