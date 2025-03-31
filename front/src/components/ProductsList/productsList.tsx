import localStorage from 'localStorage';
import { IProduct } from 'model/IProduct';
import Image from 'next/image';
import React from 'react';
import styles from './ProductsList.module.css';
import pizzas from '/public/images/products/sample.png';
import { NumberFormatBase } from 'react-number-format';


export function ProductsList({ data, cartData, setCartData, setProductAddedToCart }:
  { data: IProduct[], cartData: any, setCartData: any, setProductAddedToCart: any }) {

  const addToCard = (product: IProduct) => {
    setCartData([...cartData, product])
    localStorage.setItem('cart', JSON.stringify([...cartData, product]))
    setProductAddedToCart(true)

    setTimeout(() => setProductAddedToCart(false), 5000)
  }

  return <>
    {Object.values(data)?.map((item, index) => (
      <div key={index} className={[styles.productsContainer, "col-xs-12 col-md-6 mb-5"].join(' ')}>

        <div>
          <Image src={pizzas} width={100} height={100} alt={item.name} />
        </div>

        <div>
          {Number(item.productType?.id) === 3 ? <span className="badge bg-info">Promoção</span> : ''}

          <h3 className="text-uppercase" title={item.name}>
            {item.name}
          </h3>

          <p title={item.description}>{item.description}</p>

          <p className={styles.price}>
            <NumberFormatBase
              format={(numStr) => {
                if (numStr === '') return '';
                return new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                  maximumFractionDigits: 2,
                }).format(Number(numStr))
              }}
              value={item.unitValue}
              displayType={'text'}
              prefix={'R$ '}
              renderText={value => <span className="badge bg-success">{value}</span>}
            />
          </p>

          <button type="button"
            className={[styles.button, "btn btn-outline-primary"].join(' ')}
            title="Adicionar ao Carrinho"
            onClick={() => addToCard(item)}
          >
            <i className="bi bi-cart2"></i> Adicionar ao Carrinho
          </button>

        </div>
      </div>
    ))}
  </>
}

export default ProductsList;