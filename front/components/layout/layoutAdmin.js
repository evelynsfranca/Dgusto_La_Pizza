import Image from 'next/image';
import logo from '/public/images/logo.png';
import Link from 'next/link';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function LayoutAdmin({ children }) {

  return (
    <>
      <div className="container">

        <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
          <Link href="/admin/products/list">
            <a className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
              Painel Administrativo
            </a>
          </Link>

          <ul className="nav nav-pills">
            <li className="nav-item">
              <Link href="/admin/products/list">
                <a className="nav-link">
                  Lista de Produtos
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/admin/users/list">
                <a className="nav-link">
                  Lista de Usuários
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/admin/categories/list">
                <a className="nav-link">
                  Lista de Categorias
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/admin/types/list">
                <a className="nav-link">
                  Lista de Tipos
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/">
                <a className="nav-link">
                  Voltar ao site
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