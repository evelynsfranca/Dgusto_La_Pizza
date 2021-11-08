import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from "react";
import LayoutAdmin from 'src/components/Layout/layoutAdmin';
import { API_URL } from 'src/utils/constants';


export default function ProductCategoriesAdd() {

  const router = useRouter();

  const [token, setToken] = useState('');
  const [productCategories, setProductCategories] = useState({
    name: ''
  });

  async function handleProductCategories() {
    const res = await fetch(`${API_URL}/admin/product-categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
      body: JSON.stringify(productCategories)
    })
      .then(res => res.json())
      .catch(e => console.warn(e));

    const response = await res;

    if (response) {
      router.push('/admin/categories/list')
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
        <title>Adicionar Nova Categorias</title>
      </Head>

      <h1 className="title">
        <Link href="/admin/categories/list">
          <a title="Voltar para listagem de categorias" className="btn-back">
            &#8249;
          </a>
        </Link>
        {' '}
        Adicionar Nova Categorias
      </h1>

      <form className="form">
        <div className="mb-3">
          <label>
            Nome
          </label>
          <input
            type="text"
            className="form-control"
            value={productCategories.name}
            onChange={category => setProductCategories({ ...productCategories, name: category.target.value })}
          />
        </div>
        
        <button className="btn btn-secondary" onClick={handleProductCategories}>SALVAR</button>
      </form>

    </LayoutAdmin>
  );
}