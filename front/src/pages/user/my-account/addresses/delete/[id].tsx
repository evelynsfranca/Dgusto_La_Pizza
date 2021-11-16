import { useRouter } from 'next/router';
import Image from 'next/image';
import useSWR from 'swr';
import Link from 'next/link';
import style from './AddressDeletePage.module.css';
import { API_URL } from 'src/utils/constants';
import LayoutGeneral from 'src/components/Layout/layoutGeneral';

// function ApiAddressDelete({ name, cartData, setCartData, setProductAddedToCart }) {
//   const fetcher = (url) => fetch(url)
//     .then(res => res.json())
//     .catch(e => console.warn(e))

//   const { data, error } = useSWR([`${API_URL}/products/categories/${name}`], fetcher)

//   if (error) return <div>failed to load</div>
//   if (!data) return <div>loading...</div>

//   return (
//     <ProductsList
//       data={data}
//       cartData={cartData}
//       setCartData={setCartData}
//       setProductAddedToCart={setProductAddedToCart}
//     />
//   )
// }

function AddressDelete({ cartData }) {
  const router = useRouter();
  const { id } = router.query;

  return (
    <LayoutGeneral
      pageName="AddressDeletePage"
      cartData={cartData}
    >
    
      <div className="container">

        deleted {id}

      </div>
    </LayoutGeneral>

  );
}

export default AddressDelete