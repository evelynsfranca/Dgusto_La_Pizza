import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from "react";
import { API_URL } from '../../../../utils/constants';
import LayoutAdmin from '../../../../components/layout/admin';


export default function TypeUpdate() {

  const router = useRouter();

  const { id } = router.query;

  const [token, setToken] = useState('');
  const [type, setType] = useState({
    id,
    name: '',
  });

  async function handleUpdateType() {
    const res = await fetch(`${API_URL}/admin/product-types`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
      body: JSON.stringify(type)
    })
      .then(res => res.json())
      .catch(e => console.warn(e));

    const response = await res;

    if (response) {
      router.push('/admin/types/list')
    }
  }

  async function handleGetTypes() {
    const res = await fetch(`${API_URL}/admin/product-types/${id}`, {
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
      setType(response)
    }
  }

  useEffect(() => {
    if (typeof window !== undefined && localStorage.getItem('token')) {

      setToken(localStorage.getItem('token'))
    }

    if (id && token) {
      handleGetTypes();
    }

  }, [id, token]);

  return (
    <LayoutAdmin>
      <Head>
        <title>Editando Tipo</title>
      </Head>

      <h1 className="title">
        <Link href="/admin/types/list">
          <a title="Voltar para listagem de tipos" className="btn-back">
            &#8249;
          </a>
        </Link>
        {' '}
        Editando Tipo
      </h1>

      <p className="form">
        <label>
          Nome
          <input
            type="text"
            value={type.name}
            onChange={name => setType({ ...type, name: name.target.value })}
          />
        </label>
        
        <button className="button-secondary" onClick={handleUpdateType}>SALVAR</button>
      </p>
    </LayoutAdmin>
  );
}