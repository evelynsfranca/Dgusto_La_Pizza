import "bootstrap-icons/font/bootstrap-icons.css";
import Link from "next/link";

function LayoutAdmin({ children }) {
  return (
    <div className="container">
      <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom align-items-center">
        
        <Link href="/admin/requests/list" style={{
          textDecoration: "none"
        }}>
          <span className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
            Painel Administrativo
          </span>
        </Link>

        <ul className="nav nav-pills d-flex align-items-center justify-content-center">
          <li className="nav-item">
            <Link href="/admin/requests/list" className="nav-link">
              <span>Pedidos</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/admin/products/list" className="nav-link">
              <span>Produtos</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/admin/users/list" className="nav-link">
              <span>Usuários</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/admin/categories/list" className="nav-link">
              <span>Categorias</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/admin/types/list" className="nav-link">
              <span>Tipos</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/" className="nav-link text-success">
              <span className="nav-link text-success">Voltar ao site</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/logout" className="nav-link">
              <span className="nav-link text-danger">Deslogar</span>
            </Link>
          </li>
        </ul>
      </header>

      <main className="my-5 py-5">{children}</main>
    </div>
  );
}

export default LayoutAdmin;
