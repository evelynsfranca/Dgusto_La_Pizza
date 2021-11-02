import useSWR from 'swr';
import { API_URL } from '../../utils/constants';
import CategoriesList from '../CategoryList/categoryList';
import Loading from '../Loading/loading';
import ProductsList from '../ProductsList/productsList';

export const Menu = () => {
  const fetcher = (url, token) => fetch(url, { headers: { "Authorization": token } })
    .then(res => res.json())
    .catch(e => console.warn(e))

  const { data, error } = useSWR(`${API_URL}/products`, fetcher)

  if (error) return <>failed to load</>
  if (!data) return <Loading />

  return (
    <>
      <ul className="nav nav-pills flex-column flex-sm-row">
        <CategoriesList data={data} />
      </ul>

      <div className="container">
        <div className="row my-5 py-5">
          <ProductsList data={data} />
        </div>
      </div>
    </>
  );
}

export default Menu;