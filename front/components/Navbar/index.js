import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import logo from '../../images/logo.png';
import style from './Navbar.module.css';

export const Navbar = () => {

  const [linkActive, setLinkActive] = useState('')

  return (
    <div className={style.bannerContainer}>
        <a href="login" className={style.loginButton}>
          LOGIN
        </a>

        <a href="https://wa.me/+5541999999999" target="_blank" className={style.bannerCard}>
          <span className={style.bannerCardText}>Peça hoje mesmo!</span>
          <span className={style.bannerCardPhone}> 
            <FontAwesomeIcon icon={faPhone} rotation={90} />
            (41) 99999-9999
          </span>
          <span className={style.bannerCardTextGreen}>Estamos abertos</span>
        </a>

      <Link href="/">
        <a className={style.logo}>
          <Image src={logo} width={150} height={120} className={style.logoImage} layout="responsive" />
        </a>
      </Link>
      <nav className={style.navbar}>
        <ul className={style.navbarList}>
          <li 
            className={style.navbarListItem, linkActive === 'menu' && style.linkActive} 
            onClick={() => setLinkActive('menu')}
          >
            <Link href="/">
              <a className={style.navbarListItemLink}>Cardápio</a>
            </Link>
          </li>
          <li 
            className={style.navbarListItem, linkActive === 'promos' && style.linkActive} 
            onClick={() => setLinkActive('promos')}
          >
            <Link href="/">
              <a className={style.navbarListItemLink}>Promoções</a>
            </Link>
          </li>
          <li 
            className={style.navbarListItem, linkActive === 'contact' && style.linkActive} 
            onClick={() => setLinkActive('contact')}
          >
            <Link href="/">
              <a className={style.navbarListItemLink}>Contato</a>
            </Link>
          </li>
          <li 
            className={style.navbarListItem, linkActive === 'address' && style.linkActive} 
            onClick={() => setLinkActive('address')}
          >
            <Link href="/">
              <a className={style.navbarListItemLink}>Localização</a>
            </Link>
          </li>
        </ul>
      </nav>

    </div> 
  );
}

export default Navbar;