import { useState } from 'react';
import Link from 'next/link';
import style from './Navbar.module.css';

function Navbar() {
  const [linkActive, setLinkActive] = useState('')

  return (
    <>

      <nav className={style.navbar}>
        <ul className={style.navbarList}>
          <li
            className={style.navbarListItem, linkActive === 'menu' ? style.linkActive : ''}
            onClick={() => setLinkActive('menu')}
          >
            <Link href="/menu">
              <a className={style.navbarListItemLink}>Quero Pedir Agora!</a>
            </Link>
          </li>
          <li
            className={style.navbarListItem, linkActive === 'my-purchases' ? style.linkActive : ''}
            onClick={() => setLinkActive('my-purchases')}
          >
            <Link href="/my-purchases">
              <a className={style.navbarListItemLink}>Meus Pedidos</a>
            </Link>
          </li>
          <li
            className={style.navbarListItem, linkActive === 'promotions' ? style.linkActive : ''}
            onClick={() => setLinkActive('promotions')}
          >
            <Link href="/promotions">
              <a className={style.navbarListItemLink}>Promoções</a>
            </Link>
          </li>
          <li
            className={style.navbarListItem, linkActive === 'contact' ? style.linkActive : ''}
            onClick={() => setLinkActive('contact')}
          >
            <Link href="/contact">
              <a className={style.navbarListItemLink}>Contato</a>
            </Link>
          </li>
        </ul>
      </nav>

    </>
  );
}

export default Navbar;