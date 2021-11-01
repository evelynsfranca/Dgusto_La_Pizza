import Image from 'next/image';
import Link from 'next/link';

import useSWR from 'swr';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '/public/images/logo.png';
import { API_URL } from '../../utils/constants';
import { useEffect, useState } from 'react';
import style from './layoutGeneral.module.css';
import Navbar from '../Navbar/navbar';
import 'bootstrap-icons/font/bootstrap-icons.css';
import RequestToday from '../requestToday/requestToday';
import Loading from '../Loading/loading';

function ApiAccount({ token }) {
  if (!token) return <></>

  const fetcher = (url, token) => fetch(url, { headers: { "Authorization": token } })
    .then(res => res.json())
    .catch(e => console.warn(e))

  const { data, error } = useSWR([`${API_URL}/account`, token], fetcher)

  if (error) return <> (failed to load)</>
  if (!data) return <Loading />

  return !!data?.authorities ? data.authorities.includes("ROLE_ADMIN") ? <>(ADM)</> : <>(USER)</> : ''
}

function LayoutGeneral({ children, pageName }) {
  const [token, setToken] = useState('');

  useEffect(() => {
    if (typeof window !== undefined && localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'))
    }
  }, []);

  return (
    <>
      <Link href="/login">
        <a className={style.loginButton}>
          LOGIN <ApiAccount token={token} />
        </a>
      </Link>

      {pageName === "HomePage" &&
        <main className={style.bannerContainer}>

          <RequestToday pageName={pageName} />

          <Link href="/">
            <a className={style.logo}>
              <Image src={logo} width={479} height={436} className={style.logoImage} layout="responsive" />
            </a>
          </Link>

          <section>
            <Navbar />
          </section>

          <section>
            {children}
          </section>

        </main>
      }

      {pageName !== "HomePage" &&

        <main>

          <section className={style.containerLogo}>
            <div className={style.sectionLogo}>

              <RequestToday pageName={pageName} />

              <Link href="/">
                <a>
                  <Image src={logo} width={165} height={150} />
                </a>
              </Link>

            </div>

            <Navbar />

            <section className="positionRelactive text-center pb-5">
              <h1 className="display-1 text-light">
                {pageName === 'MenuPage' &&
                  <span>
                    Cardápio
                  </span>
                }

                {pageName === 'MyRequestsPage' &&
                  <span>
                    Meus Pedidos
                  </span>
                }

                {pageName === 'PromotionsPage' &&
                  <span>
                    Promoções
                  </span>
                }
                {pageName === 'ContatoPage' &&
                  <span>
                    Contato
                  </span>
                }
              </h1>

              <p className="text-light mb-5">
                {pageName === 'MenuPage' &&
                  <span>
                    O sabor que conquistou os Curitibanos!
                  </span>
                }

                {pageName === 'PromotionsPage' &&
                  <span>
                    Aproveite as promoções da D’Gusto! A cada pedaço uma experiência única!
                  </span>
                }
              </p>

            </section>

          </section>

          {children}
        </main>
      }

    </>
  )
}

export default LayoutGeneral;