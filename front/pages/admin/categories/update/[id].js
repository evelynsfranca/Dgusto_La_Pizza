import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from "react";
import { API_URL } from '../../../../utils/constants';
import LayoutAdmin from '../../../../components/layout/admin';


export default function CategoryUpdate() {

  const router = useRouter();

  const { id } = router.query;

  const [token, setToken] = useState('');
  const [category, setCategory] = useState({
    id,
    name: '',
  });

  async function handleUpdateCategory() {
    const res = await fetch(`${API_URL}/admin/product-categories`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
      body: JSON.stringify(category)
    })
      .then(res => res.json())
      .catch(e => console.warn(e));

    const response = await res;

    if (response) {
      router.push('/admin/categories/list')
    }
  }

  async function handleGetCategory() {
    const res = await fetch(`${API_URL}/admin/product-categories/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      }
    })
      .then(res => res.json())
      .catch(e => console.warn(e));

    const response = await res;

    if (response) {
      setCategory(response)
    }
  }

  useEffect(() => {
    if (typeof window !== undefined && localStorage.getItem('token')) {

      setToken(localStorage.getItem('token'))
    }

    if (id && token) {
      handleGetCategory();
    }

  }, [id, token]);

  return (
    <LayoutAdmin>
      <Head>
        <title>Editando categoria</title>
      </Head>

      <h1 className="title">
        <Link href="/admin/categories/list">
          <a title="Voltar para listagem de categoria" className="btn-back">
            &#8249;
          </a>
        </Link>
        {' '}
        Editando categoria
      </h1>

      <p className="form">
        <label>
          Nome
          <input
            type="text"
            value={category.name}
            onChange={name => setCategory({ ...category, name: name.target.value })}
          />
        </label>
        
        <button className="button-secondary" onClick={handleUpdateCategory}>SALVAR</button>
      </p>
    </LayoutAdmin>
  );
}