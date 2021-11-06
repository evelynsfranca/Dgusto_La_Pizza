import LayoutGeneral from '../components/Layout/layoutGeneral';
import Link from 'next/link';

function NotFoundPage() {
  return (
    <LayoutGeneral pageName="NotFoundPage">

      <main className="container">
        <h1 className="text-white">404 - Página não encontrada</h1>
        <p className="text-white">Tente acessar esta página novamente mais tarde, no momento estamos preparando ela =/</p>

        <Link href="/">
          <a className="btn btn-outline-light">
            Voltar ao site
          </a>
        </Link>

      </main>

    </LayoutGeneral>
  )
}

export default NotFoundPage;