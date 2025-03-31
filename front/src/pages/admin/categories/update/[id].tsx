import { getProductCategory, updateProductCategory } from 'api/admin/product-category';
import localStorage from 'localStorage';
import { ApiResponse } from 'model/ApiResponse';
import { IProductCategory } from 'model/IProductCategory';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from "react";
import LayoutAdmin from 'src/components/Layout/layoutAdmin';


export default function CategoryUpdate() {

  const router = useRouter();
  const { id } = router.query;  
  const token = localStorage.getItem('token');

  const [category, setCategory] = useState<IProductCategory>({});

  async function handleUpdateCategory() {
    const response = await updateProductCategory(category, token);
    response.status === 201 && router.push('/admin/categories/list')
  }

  async function handleGetCategory() {
    const response: ApiResponse<IProductCategory> = await getProductCategory(id.toString(), token);
    response.entity && setCategory(response.entity)
  }

  useEffect(() => {
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
          <span title="Voltar para listagem de categoria" className="btn-back">
            &#8249;
          </span>
        </Link>
        {' '}
        Editando categoria
      </h1>

      <form className="form">
        <div className="mb-3">
          <label>
            Nome
          </label>
          <input
            type="text"
            className="form-control"
            value={category.name}
            onChange={name => setCategory({ ...category, name: name.target.value })}
          />
        </div>

        <button type="button" className="btn btn-secondary" onClick={handleUpdateCategory}>SALVAR</button>
      </form>
    </LayoutAdmin>
  );
}