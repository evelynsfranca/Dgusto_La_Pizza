import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from "react";
import useSWR from 'swr';
import { API_URL } from '../../../../utils/constants';
import LayoutAdmin from '../../../../components/layout/layoutAdmin';

function ApiTypeDetail({ token }) {

  if (!token) return <></>

  const router = useRouter();

  const { id } = router.query;

  const fetcher = (url, token) => fetch(url, { headers: { "Authorization": token } })
    .then(res => res.json())
    .catch(e => console.warn(e))

  const { data, error } = useSWR([`${API_URL}/admin/product-types/${id}`, token], fetcher)

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
    </tr>
  </>
}


export default function TypeDetail() {

  const [token, setToken] = useState('');

  useEffect(() => {
    if (typeof window !== undefined && localStorage.getItem('token')) {

      setToken(localStorage.getItem('token'))
    }
  }, []);

  return (
    <LayoutAdmin>

      <Head>
        <title>Detalhes do tipo</title>
      </Head>

      <h1 className="title">
        <Link href="/admin/types/list">
          <a title="Voltar para listagem de tipos" className="btn-back">
            &#8249;
          </a>
        </Link>
        {' '}
        Detalhes do tipo
      </h1>

      <table className="table my-5 py-5">
        <thead>
          <tr>
            <td>#</td>
            <td>Nome</td>
          </tr>
        </thead>
        <tbody>
          <ApiTypeDetail token={token} />
        </tbody>
      </table>

    </LayoutAdmin>

  );
}