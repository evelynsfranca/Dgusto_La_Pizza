import CurrencyFormat from 'react-currency-format';
import Image from 'next/image';
import pizzas from '/public/images/products/sample.png';
import styles from './ProductsList.module.css';
import localStorage from 'localStorage';

export interface IContentProducts {
  content: IProducts[];
}

export interface IProducts {
  id: Number | any;
  name: string;
  description: string;
  unitValue: Number;
  productType: IProductType;
  qty: 1
}

export interface IProductType {
  id: Number;
}

export function ProductsList({ data, cartData, setCartData, setProductAddedToCart }:
  { data: IContentProducts, cartData: any, setCartData: any, setProductAddedToCart: any }) {

  const addToCard = (product: IProducts) => {
    setCartData([...cartData, product])
    localStorage.setItem('cart', JSON.stringify([...cartData, product]))
    setProductAddedToCart(true)

    setTimeout(() => setProductAddedToCart(false), 5000)
  }

  return <>
    {data?.content?.map((flavor, index) => (
      <>
        <div key={index} className={[styles.productsContainer, "col-xs-12 col-md-6 mb-5"].join(' ')}>

          <div>
            <Image src={pizzas} width={100} height={100} alt={flavor.name} />
          </div>

          <div>
            {flavor.productType.id === 3 ? <span className="badge bg-info">Promoção</span> : ''}

            <h3 className="text-uppercase" title={flavor.name}>
              {flavor.name}
            </h3>

            <p title={flavor.description}>{flavor.description}</p>

            <p className="price">
              <CurrencyFormat
                value={flavor.unitValue}
                displayType={'text'}
                decimalSeparator={','}
                prefix={'R$ '}
                renderText={value => <span className="badge bg-success">{value}</span>}
              />
            </p>

            <button type="button"
              className="btn btn-outline-primary"
              title="Adicionar ao Carrinho"
              onClick={() => addToCard(flavor)}
            >
              <i className="bi bi-cart2"></i> Adicionar ao Carrinho
            </button>

          </div>

        </div>
      </>
    ))}
  </>
}

export default ProductsList;