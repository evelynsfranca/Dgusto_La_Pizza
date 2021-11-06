import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from "react";
import LayoutAdmin from 'src/components/Layout/layoutAdmin';
import { API_URL } from 'src/utils/constants';


export default function ProductTypesAdd() {

  const router = useRouter();

  const [token, setToken] = useState('');
  const [productTypes, setProductTypes] = useState({
    name: ''
  });

  async function handleProductTypes() {
    const res = await fetch(`${API_URL}/admin/product-types`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
      body: JSON.stringify(productTypes)
    })
      .then(res => res.json())
      .catch(e => console.warn(e));

    const response = await res;

    if (response) {
      router.push('/admin/types/list')
    }
  }

  useEffect(() => {
    if (typeof window !== undefined && localStorage.getItem('token')) {

      setToken(localStorage.getItem('token'))
    }
  }, []);

  return (
    <LayoutAdmin>
      <Head>
        <title>Adicionar Nova Tipos</title>
      </Head>

      <h1 className="title">
        <Link href="/admin/types/list">
          <a title="Voltar para listagem de tipos" className="btn-back">
            &#8249;
          </a>
        </Link>
        {' '}
        Adicionar Novo Tipo
      </h1>

      <form className="form">
        <div className="mb-3">
          <label>
            Nome
          </label>
          <input
            className="form-control"
            type="text"
            value={productTypes.name}
            onChange={type => setProductTypes({ ...productTypes, name: type.target.value })}
          />
        </div>

        <button className="btn btn-secondary" onClick={handleProductTypes}>SALVAR</button>
      </form>

    </LayoutAdmin>
  );
}