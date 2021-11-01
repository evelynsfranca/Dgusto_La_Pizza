import useSWR from 'swr';
import { API_URL } from '../../utils/constants';
import styles from './Menu.module.css';
import CurrencyFormat from 'react-currency-format';
import Image from 'next/image';
import pizzas from '/public/images/products/sample.png';
import Loading from '../Loading/loading';

export const Menu = () => {
  const fetcher = (url) => fetch(url)
    .then(res => res.json())
    .catch(e => console.warn(e))

  const { data, error } = useSWR(`${API_URL}/products`, fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <Loading/>

  return (
    <>
      {/* <div>
        <h2>{data?.content?.filter(it => it.pizzaCategory != null).length > 0 ? data?.content?.filter(it => it.pizzaCategory.name != null)[0].pizzaCategory : ''}</h2>
      </div> */}

      <div className="container">
        <div className="row my-5 py-5">

          {data?.content?.map(flavor => (
            <div key={flavor.id} className={[styles.productsContainer, "col-xs-12 col-md-6 mb-5"].join(' ')}>

              <div>
                <Image src={pizzas} width={100} height={100} />
              </div>

              <div>
                <h3 className="text-uppercase">{flavor.name}</h3>

                <p>{flavor.description}</p>

                <p className="price">
                  <CurrencyFormat
                    value={flavor.unitValue}
                    displayType={'text'}
                    decimalSeparator={','}
                    prefix={'R$ '}
                    renderText={value => <span className="badge bg-success">{value},00</span>}
                  />
                </p>
              </div>

            </div>
          ))}

        </div>
      </div>
    </>
  );
}

export default Menu;