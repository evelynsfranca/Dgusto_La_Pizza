import { useEffect, useState } from 'react';
import Link from 'next/link';
import style from './Navbar.module.css';
import localStorage from 'localStorage';

function Navbar({ cartData }) {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [linkActive, setLinkActive] = useState('');
  const [dropDownOpened, setDropDownOpened] = useState(false);

  const toggleDropDown = () =>
    dropDownOpened
      ? setDropDownOpened(false)
      : setDropDownOpened(true)

  useEffect(() => { !!localStorage.getItem('token') && setIsLoggedIn(true) }, []);

  return (
    <>
      <nav className={style.navbar}>
        <ul className={style.navbarList}>

          <li
            className={[style.navbarListItem, linkActive === 'menu' ? style.linkActive : ''].join(' ')}
            onClick={() => setLinkActive('menu')}
          >
            <Link href="/menu">
              <span className={style.navbarListItemLink}>Quero Pedir Agora!</span>
            </Link>
          </li>
          
          <li
            className={style.navbarListItem}
          >
            <Link  href="/cart">
              <span className={style.navbarListItemLink} title="Meu carrinho">
                <i className="bi bi-cart2"></i>
                <span className={style.cartItemsQuantity}>
                  {!!cartData ? cartData.length : 0}
                </span>
              </span>
            </Link>
          </li>

          <li>
            <div className="dropdown">
              <a 
                className={[style.navbarListItemLink, " dropdown-toggle", dropDownOpened ? " show " : ""].join(' ')}
                onClick={toggleDropDown} 
                href="#" 
                role="button" 
                id="dropdownMenuLink" 
                data-bs-toggle="dropdown" 
                aria-expanded={dropDownOpened}
              >
                Minha Conta
              </a>

              <ul 
                className={["dropdown-menu", dropDownOpened ? " show " : ""].join(' ')} 
                aria-labelledby="dropdownMenuLink"
                >
                {isLoggedIn &&
                  <>
                    <li>
                      <Link href="/user/my-purchases">
                        <span className="dropdown-item">Meus Pedidos</span>
                      </Link>
                    </li>

                    <li>
                      <Link href="/user/my-account">
                        <span className="dropdown-item">Meus Dados</span>
                      </Link>
                    </li>

                    <li>
                      <Link href="/logout">
                        <span className="dropdown-item">Sair</span>
                      </Link>
                    </li>
                  </>
                }

                {!isLoggedIn &&
                  <>
                    <li>
                      <Link href="/create-account">
                        <span className="dropdown-item">Criar conta</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/login">
                        <span className="dropdown-item">
                          Entrar
                        </span>
                      </Link>
                    </li>
                  </>
                }

              </ul>
            </div>
          </li>
          <li
            className={[style.navbarListItem, linkActive === 'promotions' ? style.linkActive : ''].join(' ')}
            onClick={() => setLinkActive('promotions')}
          >
            <Link href="/promotions">
              <span className={style.navbarListItemLink}>Promoções</span>
            </Link>
          </li>
          <li
            className={[style.navbarListItem, linkActive === 'contact' ? style.linkActive : ''].join(' ')}
            onClick={() => setLinkActive('contact')}
          >
            <Link href="/contact">
              <span className={style.navbarListItemLink}>Contato</span>
            </Link>
          </li>
        </ul>
      </nav>

    </>
  );
}

export default Navbar;