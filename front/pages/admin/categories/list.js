import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import { useEffect, useState } from "react";
import useSWR from 'swr';
import LayoutAdmin from '../../../components/layout/admin';
import { API_URL } from '../../../utils/constants';

function ApiCategoriesList({ token }) {

  if (!token) return <></>

  const router = useRouter();

  const fetcher = (url, token) => fetch(url, { headers: { "Authorization": token } })
    .then(res => res.json())
    .catch(e => console.warn(e))

  const { data, error } = useSWR([`${API_URL}/admin/product-categories`, token], fetcher)

  if (error) return <tr rowSpan="4"><td>failed to load</td></tr>
  if (!data) return <tr rowSpan="4"><td>loading...</td></tr>

  return <>
    {data.content.map((user, index) => (
      <tr key={index}>
        <td>
          {user.name}
        </td>
        <td>
          <button type="button" className="btn btn-secondary" onClick={() => router.push(`/admin/categories/detail/${user.id}`)} title="Visualizar">
            Ver
          </button>
          {' '}
          <button type="button" className="btn btn-primary" onClick={() => router.push(`/admin/categories/update/${user.id}`)} title="Editar">
            Editar
          </button>
        </td>
      </tr>
    ))}
  </>
}

export default function CategoriesList() {

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
        <title>Lista de Categorias</title>
      </Head>

      <h1 className="title">
        Lista de Categorias
      </h1>

      <button type="button" className="btn btn-primary" onClick={() => router.push('/admin/categories/save')}>
        ADICIONAR CATEGORIA
      </button>

      <table className="table my-5 py-5">
        <thead>
          <tr>
            <td>Categoria</td>
            <td>Ações</td>
          </tr>
        </thead>
        <tbody>
          <ApiCategoriesList token={token} />
        </tbody>
      </table>

    </LayoutAdmin>
  );
}