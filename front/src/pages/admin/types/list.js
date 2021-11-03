import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import { useEffect, useState } from "react";
import useSWR from 'swr';
import LayoutAdmin from '../../../components/Layout/layoutAdmin';
import { API_URL } from '../../../utils/constants';

function ApiTypesList({ token }) {

  if (!token) return <></>

  const router = useRouter();

  const fetcher = (url, token) => fetch(url, { headers: { "Authorization": token } })
    .then(res => res.json())
    .catch(e => console.warn(e))

  const { data, error } = useSWR([`${API_URL}/admin/product-types`, token], fetcher)

  if (error) return <tr><td colSpan="4">failed to load</td></tr>
  if (!data) return <tr><td colSpan="4">loading...</td></tr>

  return <>
    {data.content.map((user, index) => (
      <tr key={index}>
        <td>
          {user.name}
        </td>
        <td>
          <button type="button" className="btn btn-secondary" onClick={() => router.push(`/admin/types/detail/${user.id}`)} title="Visualizar">
            Ver
          </button>
          {' '}
          <button type="button" className="btn btn-primary" onClick={() => router.push(`/admin/types/update/${user.id}`)} title="Editar">
            Editar
          </button>
        </td>
      </tr>
    ))}
  </>
}

export default function TypesList() {

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
        <title>Lista de Tipos</title>
      </Head>

      <h1 className="title">
        Lista de Tipos
      </h1>

      <button type="button" className="btn btn-primary"  onClick={() => router.push('/admin/types/save')}>
        ADICIONAR TIPOS
      </button>

      <table className="table my-5 py-5">
        <thead>
          <tr>
            <td>Tipos</td>
            <td>Ações</td>
          </tr>
        </thead>
        <tbody>
          <ApiTypesList token={token} />
        </tbody>
      </table>

    </LayoutAdmin>
  );
}