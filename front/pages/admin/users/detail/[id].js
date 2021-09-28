import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from "react";
import useSWR from 'swr';
import { API_URL } from '../../../../utils/constants';
import LayoutAdmin from '../../../../components/layout/admin';

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
    <ul style={{ display: 'flex', flexDirection: 'column', listStyle: 'none', width: '100%' }}>
      <li style={{ display: 'flex', width: '100%', justifyContent: 'space-around' }}>
        <span>{data.id}</span>
        <span>{data.name}</span>
        <span>{data.email}</span>
      </li>
    </ul>
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

      <ApiUserDetail token={token} />

    </LayoutAdmin>

  );
}