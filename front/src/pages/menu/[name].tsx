import { useRouter } from 'next/router';
import Image from 'next/image';
import useSWR from 'swr';
import Link from 'next/link';
import pizza from '/public/images/pizza.png';
import style from './MenuDetailPage.module.css';
import ProductsList from 'src/components/ProductsList/productsList';
import { API_URL } from 'src/utils/constants';
import LayoutGeneral from 'src/components/Layout/layoutGeneral';

function ApiMenuDetail({ name, cartData, setCartData, setProductAddedToCart }) {
  const fetcher = (url) => fetch(url)
    .then(res => res.json())
    .catch(e => console.warn(e))

  const { data, error } = useSWR([`${API_URL}/products/categories/${name}`], fetcher)

  if (error || data?.status === 500) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <ProductsList
      data={data}
      cartData={cartData}
      setCartData={setCartData}
      setProductAddedToCart={setProductAddedToCart}
    />
  )
}

function MenuDetail({ cartData, setCartData, productAddedToCart, setProductAddedToCart }) {
  const router = useRouter();
  const { name } = router.query;

  return (
    <LayoutGeneral
      pageName="MenuDetailPage"
      cartData={cartData}
      productAddedToCart={productAddedToCart}
    >
      <section className={style.pizzaContainer}>
        <Image src={pizza} width={384} height={221} />
      </section>

      <div className="container">

        <div className="row mt-5 pt-5 text-center">
          <div className="col">
            <h1 className="display-1 text-capitalize">
              <Link href="/menu">
                <a className={style.customLink} title="Voltar">
                  <i className="bi bi-chevron-left"></i>
                </a>
              </Link>
              {' '}
              {name}
            </h1>
          </div>
        </div>

        <div className="row my-5 py-5">
          <ApiMenuDetail
            name={name}
            cartData={cartData}
            setCartData={setCartData}
            setProductAddedToCart={setProductAddedToCart} />
        </div>
      </div>
    </LayoutGeneral>

  );
}

export default MenuDetail