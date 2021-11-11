import 'bootstrap-icons/font/bootstrap-icons.css';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Navbar from '../Navbar/navbar';
import RequestToday from '../RequestToday/requestToday';
import style from './layoutGeneral.module.css';
import logo from '/public/images/logo.png';

function LayoutGeneral({ children, pageName, cartData, productAddedToCart=false }) {
  const [token, setToken] = useState('');

  useEffect(() => {
    if (typeof window !== undefined && localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'))
    }

  }, []);

  return (
    <>
      <Head>
        <title>
          {pageName === 'HomePage' ?
            'Início'
            : ''}

          {pageName === 'MenuPage' ?
            'Cardápio'
            : ''}

          {pageName === 'MenuDetailPage' ?
            'Cardápio'
            : ''}

          {pageName === 'MyPurchasesPage' ?
            'Meus Pedidos'
            : ''}

          {pageName === 'PromotionsPage' ?
            'Promoções'
            : ''}

          {pageName === 'ContactPage' ?
            'Contato'
            : ''}

          {pageName === 'LoginPage' ?
            'Login'
            : ''}

          {pageName === 'CreateAccountPage' ?
            'Criar Conta'
            : ''}

          {pageName === 'NotFoundPage' ?
            'Não encontramos esta página'
            : ''}

          {pageName === 'CartPage' ?
            'Carrinho'
            : ''}

          {pageName === 'CheckoutPage' ?
            'Finalizar Compra'
            : ''}

          {' '}

          - D'Gusto La Pizza
        </title>
      </Head>

      {pageName === "HomePage" &&
        <main className={style.bannerContainer}>

          <RequestToday pageName={pageName} />

          <Link href="/">
            <a className={style.logo}>
              <Image src={logo} width={479} height={436} className={style.logoImage} layout="responsive" />
            </a>
          </Link>

          <section>
            <Navbar cartData={cartData} />
          </section>

          <section>
            {children}
          </section>

        </main>
      }

      {pageName !== "HomePage" && pageName !== "NotFoundPage" &&

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

            <Navbar cartData={cartData} />

            <section className="positionRelactive text-center pb-5">
              <h1 className="display-1 text-light">
                {pageName === 'MenuPage' &&
                  <span>
                    Cardápio
                  </span>
                }

                {pageName === 'MenuDetailPage' &&
                  <span>
                    Cardápio
                  </span>
                }

                {pageName === 'MyPurchasesPage' &&
                  <span>
                    Meus Pedidos
                  </span>
                }

                {pageName === 'PromotionsPage' &&
                  <span>
                    Promoções
                  </span>
                }

                {pageName === 'ContactPage' &&
                  <span>
                    Contato
                  </span>
                }

                {pageName === 'LoginPage' &&
                  <span>
                    Login
                  </span>
                }

                {pageName === 'CreateAccountPage' &&
                  <span>
                    Criar Conta
                  </span>
                }

                {pageName === 'CartPage' &&
                  <span>
                    Carrinho
                  </span>
                }

                {pageName === 'CheckoutPage' &&
                  <span>
                    Finalizar Compra
                  </span>
                }

              </h1>

              <p className="text-light mb-5">
                {pageName === 'MenuPage' &&
                  <span>
                    O sabor que conquistou os Curitibanos!
                  </span>
                }

                {pageName === 'MenuDetailPage' &&
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

      {pageName === "NotFoundPage" &&

        <main className={style.bannerContainer}>

          <section className={style.notFoundContainer}>
            {children}
          </section>

        </main>

      }

      {productAddedToCart &&
        <div className="position-fixed top-0 end-0 p-3">
          <div id="liveToast" className="toast show" role="alert" aria-live="assertive" aria-atomic="true">
            <div className="toast-header">
              <strong className="me-auto">Produto Adicionado</strong>
            </div>
            <div className="toast-body">
              Produto Adicionado ao Carrinho com sucesso!
            </div>
          </div>
        </div>
      }

    </>
  )
}

export default LayoutGeneral;