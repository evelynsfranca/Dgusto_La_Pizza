import { getProductType } from 'api/admin/product-type';
import localStorage from 'localStorage';
import { ApiResponse } from 'model/ApiResponse';
import { IProductType } from 'model/IProductType';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from "react";
import LayoutAdmin from 'src/components/Layout/layoutAdmin';


export default function TypeDetail() {
  const router = useRouter();
  const { id } = router.query;  
  const token = localStorage.getItem('token');

  const [productType, setProductType] = useState<IProductType>({});
  
  async function handleGetProductType() {
    const response: ApiResponse<IProductType> = await getProductType(id.toString(), token);

    if (response.entity) {
      setProductType(response.entity)
    }
  }

  useEffect(() => {
    if (id && token) {
      handleGetProductType();
    }
  }, [id, token]);

  return (
    <LayoutAdmin>

      <Head>
        <title>Detalhes do tipo</title>
      </Head>

      <h1 className="title">
        <Link href="/admin/types/list">
          <a title="Voltar para listagem de tipos" className="btn-back">
            &#8249;
          </a>
        </Link>
        {' '}
        Detalhes do tipo
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
              {productType.id}
            </td>
            <td>
              {productType.name}
            </td>
          </tr>
        </tbody>
      </table>

    </LayoutAdmin>

  );
}