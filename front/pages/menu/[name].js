import { useRouter } from 'next/router';
import Image from 'next/image';
import useSWR from 'swr';
import LayoutGeneral from '../../components/layout/layoutGeneral';
import ProductsList from '../../components/ProductsList/productsList';
import { API_URL } from "../../utils/constants";
import Link from 'next/link';

import pizza from '/public/images/pizza.png';
import style from './MenuDetailPage.module.css';

function ApiMenuDetail() {

  const router = useRouter();
  const { name } = router.query;

  const fetcher = (url) => fetch(url)
    .then(res => res.json())
    .catch(e => console.warn(e))

  const { data, error } = useSWR([`${API_URL}/products/categories/${name}`], fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return <>
    <ProductsList data={data} />
  </>
}

function MenuDetail() {
  const router = useRouter();
  const { name } = router.query;

  return (
    <LayoutGeneral pageName="MenuDetailPage">
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
          <ApiMenuDetail />
        </div>
      </div>
    </LayoutGeneral>

  );
}

export default MenuDetail