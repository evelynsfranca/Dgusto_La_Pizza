import { getAllProducts } from 'api/product';
import { IProduct } from 'model/IProduct';
import { useEffect, useState } from 'react';
import CategoriesList from '../CategoryList/categoryList';
import ProductsList from '../ProductsList/productsList';

export function Menu({ cartData, setCartData, setProductAddedToCart }): any {
  
  const [products, setProducts] = useState<IProduct[]>([])

  async function handleGetAllUsers() {
    const response = await getAllProducts();
    response.content.content && setProducts(response.content.content)
  }

  useEffect(() => {
    handleGetAllUsers();
  }, []);

  return (
    <>
      <ul className="nav nav-pills flex-column flex-sm-row">
        <CategoriesList data={products} />
      </ul>

      <div className="container">
        <div className="row my-5 py-5">
          <ProductsList
            data={products}
            cartData={cartData}
            setCartData={setCartData}
            setProductAddedToCart={setProductAddedToCart}
          />
        </div>
      </div>
    </>
  );
}

export default Menu;