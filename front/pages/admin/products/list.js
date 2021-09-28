import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import { useEffect, useState } from "react";
import useSWR from 'swr';
import { API_URL } from '../../../utils/constants';
import LayoutAdmin from '../../../components/layout/admin';
import NumberFormat from 'react-number-format';
import { faEye, faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function ApiProductsList({ token }) {

  if (!token) return <></>

  const router = useRouter();

  const fetcher = (url, token) => fetch(url, { headers: { "Authorization": token } })
    .then(res => res.json())
    .catch(e => console.warn(e))

  const { data, error } = useSWR([`${API_URL}/admin/products`, token], fetcher)

  if (error) return <tr rowspan="4"><td>failed to load</td></tr>
  if (!data) return <tr rowspan="4"><td>loading...</td></tr>

  return <>
    {data.content.map((product, index) => (
      <tr key={index}>
        <td>
          {product.name}
        </td>
        <td>
          <NumberFormat value={product.value} displayType={'text'} thousandSeparator={true} prefix={'R$'} />
        </td>
        <td>
          {product.stockQuantity}
        </td>
        <td>
          <button type="button" className="button-secondary" onClick={() => router.push(`/admin/products/detail/${product.id}`)} title="Visualizar">
            <FontAwesomeIcon
              icon={faEye}
              className="icon"
            />
          </button>
          {' '}
          <button type="button" className="button-tertiary" onClick={() => router.push(`/admin/products/update/${product.id}`)} title="Editar">
            <FontAwesomeIcon
              icon={faPen}
              className="icon"
            />
          </button>
        </td>
      </tr>
    ))}
  </>
}


export default function ProductList() {
  const router = useRouter();
  const [token, setToken] = useState('');

  useEffect(() => {
    if (typeof window !== undefined && localStorage.getItem('token')) {

      setToken(localStorage.getItem('token'))
    }
  }, []);

  return (
    <LayoutAdmin>
      <Head>
        <title>ProductsList</title>
      </Head>

      <h1 className="title">
        Lista de produtos
      </h1>

      <button type="button" className="button-primary" onClick={() => router.push('/admin/products/save')}>
        ADICIONAR PRODUTO
      </button>

      <table>
        <thead>
          <tr>
            <td>Sabor</td>
            <td>Preço</td>
            <td>Estoque</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          <ApiProductsList token={token} />
        </tbody>
      </table>

    </LayoutAdmin>
  );
}