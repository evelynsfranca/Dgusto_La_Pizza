import { getProductCategory } from 'api/admin/product-category';
import localStorage from 'localStorage';
import { ApiResponse } from 'model/ApiResponse';
import { IProductCategory } from 'model/IProductCategory';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from "react";
import LayoutAdmin from 'src/components/Layout/layoutAdmin';


export default function CategoryDetail() {

  const router = useRouter();
  const { id } = router.query;  
  const token = localStorage.getItem('token');

  const [productCategory, setProductCategory] = useState<IProductCategory>({});
  
  async function handleGetProductCategory(id: string) {
    const response: ApiResponse<IProductCategory> = await getProductCategory(id, token);

    if (response.entity) {
      setProductCategory(response.entity)
    }
  }

  useEffect(() => {
    if (id && token) {
      handleGetProductCategory(id.toString());
    }
  }, [id, token]);

  return (
    <LayoutAdmin>

      <Head>
        <title>Detalhes da categoria</title>
      </Head>

      <h1 className="title">
        <Link href="/admin/categories/list">
          <span title="Voltar para listagem de categorias" className="btn-back">
            &#8249;
          </span>
        </Link>
        {' '}
        Detalhes da categoria
      </h1>

      <table className="table my-5 py-5">
        <thead>
          <tr>
            <td>#</td>
            <td>Nome</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              {productCategory?.id?.toString()}
            </td>
            <td>
              {productCategory?.name}
            </td>
          </tr>
        </tbody>
      </table>


    </LayoutAdmin>

  );
}