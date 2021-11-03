import CurrencyFormat from 'react-currency-format';
import Image from 'next/image';
import pizzas from '/public/images/products/sample.png';
import styles from './ProductsList.module.css';

export interface IContentProducts {
  content: IProducts[];
}

export interface IProducts {
  id: Number | any;
  name: String;
  description: String;
  unitValue: Number;
  productType: IProductType;
}

export interface IProductType {
  id: Number;
}

export function ProductsList({ data }: { data: IContentProducts }) {
  return <>
    {data?.content?.map(flavor => (
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

export default ProductsList;