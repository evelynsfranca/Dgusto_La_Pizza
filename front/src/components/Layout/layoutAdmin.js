import Link from 'next/link';
import 'bootstrap-icons/font/bootstrap-icons.css';

function LayoutAdmin({ children }) {

  return (
    <>
      <div className="container">

        <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
          <Link href="/admin/requests/list">
            <a className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
              Painel Administrativo
            </a>
          </Link>

          <ul className="nav nav-pills">
            <li className="nav-item">
              <Link href="/admin/requests/list">
                <a className="nav-link">
                  Pedidos
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/admin/products/list">
                <a className="nav-link">
                  Produtos
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/admin/users/list">
                <a className="nav-link">
                  Usuários
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/admin/categories/list">
                <a className="nav-link">
                  Categorias
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/admin/types/list">
                <a className="nav-link">
                  Tipos
                </a>
              </Link>
            </li>
            <li className="nav-item ms-4">
              <Link href="/">
                <a className="nav-link text-success">
                  Voltar ao site
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/logout">
                <a className="nav-link text-danger">
                  Deslogar
                </a>
              </Link>
            </li>
          </ul>
        </header>

        <main className="my-5 py-5">

          {children}

        </main>

      </div>
    </>
  )
}

export default LayoutAdmin;