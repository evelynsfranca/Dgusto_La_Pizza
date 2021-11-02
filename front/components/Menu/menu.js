import { useEffect, useState } from 'react';

import useSWR from 'swr';
import { API_URL } from '../../utils/constants';
import styles from './Menu.module.css';
import CurrencyFormat from 'react-currency-format';
import Image from 'next/image';
import pizzas from '/public/images/products/sample.png';
import Loading from '../Loading/loading';
import { groupBy } from 'lodash';

export const ListCategory = ({ data }) => {
  const list = data.content.filter(it => it.productCategory != null).map(category => category.productCategory)
  return (Object.keys(groupBy(list, 'name')).map((item, index) => {
    return (<li key={index} className={[styles.listItem, "flex-sm-fill text-sm-center nav-link "].join(' ')}>
      <a>{item}</a>
    </li>)
  }))
}

export const Menu = () => {
  const [productslist, setProductslist] = useState([]);

  const loadProducts = () => {

    const fetcher = (url, token) => fetch(url, { headers: { "Authorization": token } })
      .then(res => res.json())
      .catch(e => console.warn(e))

    const { data, error } = useSWR(`${API_URL}/products`, fetcher)

    if (error) return <>failed to load</>
    if (!data) return <Loading />

    return setProductslist(data)
  }

  useEffect(() => {
    loadProducts()
  }, [productslist]);

  return (
    <>
      <ul className="nav nav-pills flex-column flex-sm-row">
        {productslist.length > 0 &&
          <ListCategory data={data} />
        }
      </ul>

      <div className="container">
        <div className="row my-5 py-5">
          {productslist.length > 0 &&
            <>
              {productslist.content.map(flavor => (
                <div key={flavor.id} className={[styles.productsContainer, "col-xs-12 col-md-6 mb-5"].join(' ')}>

                  <div>
                    <Image src={pizzas} width={100} height={100} />
                  </div>

                  <div>
                    {flavor.productType.id === 3 ? <span className="badge bg-info">Promoção</span> : ''}

                    <h3 className="text-uppercase">
                      {flavor.name}
                    </h3>

                    <p>{flavor.description}</p>

                    <p className="price">
                      <CurrencyFormat
                        value={flavor.unitValue}
                        displayType={'text'}
                        decimalSeparator={','}
                        prefix={'R$ '}
                        renderText={value => <span className="badge bg-success">{value}</span>}
                      />
                    </p>
                  </div>

                </div>
              ))}
            </>
          }

        </div>
      </div>
    </>
  );
}

export default Menu;