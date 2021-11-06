import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from "react";
import NumberFormat from 'react-number-format';
import useSWR from 'swr';
import LayoutAdmin from '../../../../components/Layout/layoutAdmin';
import { API_URL } from '../../../../utils/constants';

function ApiRequestDetail({ token }) {
  if (!token) return <></>
  const router = useRouter();
  const { id } = router.query;

  const fetcher = (url, token) => fetch(url, { headers: { "Authorization": token } })
    .then(res => res.json())
    .catch(e => console.warn(e))

  const { data, error } = useSWR([`${API_URL}/admin/requests/${id}`, token], fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  return <>
    <tr>
      <td>
        {data.id}
      </td>
      <td>
        {data.orderNumber}
      </td>
      <td>
        {data.status}
      </td>
      <td>
        {data.client}
      </td>
    </tr>
  </>
}

export default function RequestDetail() {
  const [token, setToken] = useState('');

  useEffect(() => {
    if (typeof window !== undefined && localStorage.getItem('token')) {

      setToken(localStorage.getItem('token'))
    }
  }, []);

  return (
    <LayoutAdmin>

      <Head>
        <title>Detalhes do pedido</title>
      </Head>

      <>
        <h1 className="title">
          <Link href="/admin/requests/list">
            <a title="Voltar para listagem de pedidos" className="btn-back">
              &#8249;
            </a>
          </Link>
          {' '}
          Detalhes do pedido
        </h1>

        <table className="table my-5 py-5">
          <thead>
            <tr>
              <td>#</td>
              <td>Número do pedido</td>
              <td>Status</td>
              <td>Cliente</td>
            </tr>
          </thead>
          <tbody>
            <ApiRequestDetail token={token} />
          </tbody>
        </table>

      </>

    </LayoutAdmin>

  );
}