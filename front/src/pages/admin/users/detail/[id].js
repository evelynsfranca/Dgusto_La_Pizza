import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from "react";
import LayoutAdmin from 'src/components/Layout/layoutAdmin';
import { API_URL } from 'src/utils/constants';
import useSWR from 'swr';

function ApiUserDetail({ token }) {

  if (!token) return <></>

  const router = useRouter();

  const { id } = router.query;

  const fetcher = (url, token) => fetch(url, { headers: { "Authorization": token } })
    .then(res => res.json())
    .catch(e => console.warn(e))

  const { data, error } = useSWR([`${API_URL}/admin/users/${id}`, token], fetcher)

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
        {data.email}
      </td>
    </tr>
  </>
}


export default function UserDetail() {

  const [token, setToken] = useState('');

  useEffect(() => {
    if (typeof window !== undefined && localStorage.getItem('token')) {

      setToken(localStorage.getItem('token'))
    }
  }, []);

  return (
    <LayoutAdmin>

      <Head>
        <title>Detalhes do usuário</title>
      </Head>

      <h1 className="title">
        <Link href="/admin/users/list">
          <a title="Voltar para listagem de usuario" className="btn-back">
            &#8249;
          </a>
        </Link>
        {' '}
        Detalhes do usuário
      </h1>

      <table className="table my-5 py-5">
        <thead>
          <tr>
            <td>#</td>
            <td>Nome</td>
            <td>Email</td>
          </tr>
        </thead>
        <tbody>
          <ApiUserDetail token={token} />
        </tbody>
      </table>

    </LayoutAdmin>

  );
}