import useSWR from 'swr';
import { useEffect, useState } from 'react';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import logo from '/public/images/logo.png';
import style from './Navbar.module.css';
import { API_URL } from '../../utils/constants';

function ApiAccount({ token }) {
  if (!token) return <></>

  const fetcher = (url, token) => fetch(url, { headers: { "Authorization": token } })
    .then(res => res.json())
    .catch(e => console.warn(e))

  const { data, error } = useSWR([`${API_URL}/account`, token], fetcher)

  if (error) return <> (failed to load)</>
  if (!data) return <> (loading...)</>

  return !!data?.authorities ? data.authorities.includes("ROLE_ADMIN") ? <>(ADM)</> : <>(USER)</> : ''
}

export default function Navbar() {

  const [linkActive, setLinkActive] = useState('')
  const [token, setToken] = useState('');

  useEffect(() => {
    if (typeof window !== undefined && localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'))
    }
  }, []);

  return (
    <div className={style.bannerContainer}>
      <a href="login" className={style.loginButton}>
        LOGIN
        {' '}
        <ApiAccount token={token} />
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
          <Image src={logo} width={479} height={436} className={style.logoImage} layout="responsive" />
        </a>
      </Link>
      <nav className={style.navbar}>
        <ul className={style.navbarList}>
          <li
            className={style.navbarListItem, linkActive === 'menu' ? style.linkActive : ''}
            onClick={() => setLinkActive('menu')}
          >
            <Link href="#menu">
              <a className={style.navbarListItemLink}>Quero Pedir Agora!</a>
            </Link>
          </li>
          <li
            className={style.navbarListItem, linkActive === 'my-purchases' ? style.linkActive : ''}
            onClick={() => setLinkActive('my-purchases')}
          >
            <Link href="#my-purchases">
              <a className={style.navbarListItemLink}>Meu Pedidos</a>
            </Link>
          </li>
          <li
            className={style.navbarListItem, linkActive === 'promotions' ? style.linkActive : ''}
            onClick={() => setLinkActive('promotions')}
          >
            <Link href="#promotions">
              <a className={style.navbarListItemLink}>Promoções</a>
            </Link>
          </li>
          <li
            className={style.navbarListItem, linkActive === 'contact' ? style.linkActive : ''}
            onClick={() => setLinkActive('contact')}
          >
            <Link href="#contact">
              <a className={style.navbarListItemLink}>Contato</a>
            </Link>
          </li>
        </ul>
      </nav>

    </div>
  );
}
