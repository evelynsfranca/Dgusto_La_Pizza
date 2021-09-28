import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from "react";
import useSWR from 'swr';
import NumberFormat from 'react-number-format';

import { API_URL } from '../../../../utils/constants';
import LayoutAdmin from '../../../../components/layout/admin';

function ApiProductDetail({ token }) {

  if (!token) return <></>

  const router = useRouter();

  const { id } = router.query;

  const fetcher = (url, token) => fetch(url, { headers: { "Authorization": token } })
    .then(res => res.json())
    .catch(e => console.warn(e))

  const { data, error } = useSWR([`${API_URL}/admin/products/${id}`, token], fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  return <>
    <tr>
      <td>
        {data.id}
      </td>
      <td>
        {data.name}
      </td>
      <td>
        {data.description}
      </td>
      <td>
        <NumberFormat value={data.value} displayType={'text'} thousandSeparator={true} prefix={'R$'} />
      </td>
      <td>
        {data.stockQuantity}
      </td>
    </tr>
  </>
}

export default function ProductDetail() {

  const [token, setToken] = useState('');

  useEffect(() => {
    if (typeof window !== undefined && localStorage.getItem('token')) {

      setToken(localStorage.getItem('token'))
    }
  }, []);

  return (
    <LayoutAdmin>

      <Head>
        <title>Detalhes do produto</title>
      </Head>

      <>
        <h1 className="title">
          <Link href="/admin/products/list">
            <a title="Voltar para listagem de produtos" className="btn-back">
              &#8249;
            </a>
          </Link>
          {' '}
          Detalhes do produto
        </h1>

        <table>
          <thead>
            <tr>
              <td>#</td>
              <td>Nome</td>
              <td>Descrição</td>
              <td>Preço</td>
              <td>Estoque</td>
            </tr>
          </thead>
          <tbody>
            <ApiProductDetail token={token} />
          </tbody>
        </table>

      </>

    </LayoutAdmin>

  );
}