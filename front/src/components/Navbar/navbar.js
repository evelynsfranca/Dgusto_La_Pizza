import { useEffect, useState } from 'react';
import Link from 'next/link';
import style from './Navbar.module.css';
import localStorage from 'localStorage';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState('');

  const [linkActive, setLinkActive] = useState('')
  const [dropDownOpened, setDropDownOpened] = useState(false)

  const toggleDropDown = () => {
    if (dropDownOpened) {
      setDropDownOpened(false)
    } else {
      setDropDownOpened(true)
    }
  }

  useEffect(() => {
    if (!!localStorage.getItem('token')) {
      setIsLoggedIn(true)
    }
  }, []);

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
          {/* <li
            className={style.navbarListItem, linkActive === 'login' ? style.linkActive : ''}
            onClick={() => setLinkActive('login')}
          >
            <Link href="/login">
              <a className={style.navbarListItemLink}>Meus Pedidos</a>
            </Link>
          </li> */}
          <li>
            <div className="dropdown">
              <a className={[style.navbarListItemLink, " dropdown-toggle", dropDownOpened ? " show " : ""].join(' ')}
                onClick={toggleDropDown} href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded={dropDownOpened}>
                Minha Conta
              </a>
              <ul className={["dropdown-menu", dropDownOpened ? " show " : ""].join(' ')} aria-labelledby="dropdownMenuLink">

                {isLoggedIn &&
                  <>
                    <li>
                      <Link href="/my-purchases">
                        <a className="dropdown-item">Meus Pedidos</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/my-account">
                        <a className="dropdown-item">Meus Dados</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/sair">
                        <a className="dropdown-item">
                          Sair
                        </a>
                      </Link>
                    </li>
                  </>
                }

                {!isLoggedIn &&
                  <>
                  <li>
                      <Link href="/create-account">
                        <a className="dropdown-item">Criar conta</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/login">
                        <a className="dropdown-item">
                          Entrar
                        </a>
                      </Link>
                    </li>
                  </>
                }

              </ul>
            </div>
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