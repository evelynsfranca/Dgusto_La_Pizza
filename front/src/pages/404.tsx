import Link from 'next/link';
import LayoutGeneral from 'src/components/Layout/layoutGeneral';

function NotFoundPage() {
  return (
    <LayoutGeneral pageName="NotFoundPage" cartData={[]}>

      <main className="container">
        <h1 className="text-white">404 - Página não encontrada</h1>
        <p className="text-white">Tente acessar esta página novamente mais tarde, no momento estamos preparando ela =/</p>

        <Link href="/">
          <span className="btn btn-outline-light">
            Voltar ao site
          </span>
        </Link>

      </main>

    </LayoutGeneral>
  )
}

export default NotFoundPage;