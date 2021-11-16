import { saveProductCategory } from 'api/admin/product-category';
import localStorage from 'localStorage';
import { IProductCategory } from 'model/IProductCategory';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from "react";
import LayoutAdmin from 'src/components/Layout/layoutAdmin';


export default function ProductCategoriesAdd() {

  const router = useRouter();
  const token = localStorage.getItem('token');
  
  const [category, setCategory] = useState<IProductCategory>({});

  async function handleCategory() {
    const response = await saveProductCategory(category, token);

    if (response) {
      router.push('/admin/categories/list')
    }
  }


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
            value={category.name}
            onChange={category => setCategory({ ...category, name: category.target.value })}
          />
        </div>
        
        <button type="button" className="btn btn-secondary" onClick={handleCategory}>SALVAR</button>
      </form>

    </LayoutAdmin>
  );
}