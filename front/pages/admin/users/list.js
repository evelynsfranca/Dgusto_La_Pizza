import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from "react";
import useSWR from 'swr';
import LayoutAdmin from '../../../components/layout/admin';
import { API_URL } from '../../../utils/constants';
import logo from '/public/images/logo.png';

function ApiUsersList({ token }) {

  if (!token) return <></>

  const router = useRouter();

  const fetcher = (url, token) => fetch(url, { headers: { "Authorization": token } })
    .then(res => res.json())
    .catch(e => console.warn(e))

  const { data, error } = useSWR([`${API_URL}/admin/users`, token], fetcher)

  if (error) return <tr rowSpan="4"><td>failed to load</td></tr>
  if (!data) return <tr rowSpan="4"><td>loading...</td></tr>

  return <>
    {data.content.map((user, index) => (
      <tr key={index}>
        <td>
          {user.name}
        </td>
        <td>
          {user.email}
        </td>
        <td>
          <button type="button" className="button-secondary" onClick={() => router.push(`/admin/users/detail/${user.id}`)} title="Visualizar">
            Ver
          </button>
          {' '}
          <button type="button" className="button-tertiary" onClick={() => router.push(`/admin/users/update/${user.id}`)} title="Editar">
            Editar
          </button>
        </td>
      </tr>
    ))}
  </>
}


export default function UserList() {

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
        <title>Lista de usuários</title>
      </Head>

      <h1 className="title">
        Lista de usuários
      </h1>

      <button type="button" className="button-primary" onClick={() => router.push('/admin/users/save')}>
        ADICIONAR USUÁRIO
      </button>

      <table>
        <thead>
          <tr>
            <td>Nome</td>
            <td>Email</td>
            <td>Ações</td>
          </tr>
        </thead>
        <tbody>
          <ApiUsersList token={token} />
        </tbody>
      </table>

    </LayoutAdmin>
  );
}