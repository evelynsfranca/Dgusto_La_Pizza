import { getProduct } from 'api/admin/product';
import localStorage from 'localStorage';
import { ApiResponse } from 'model/ApiResponse';
import { IProduct } from 'model/IProduct';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from "react";
import LayoutAdmin from 'src/components/Layout/layoutAdmin';


export default function ProductDetail() {

  const router = useRouter();
  const token = localStorage.getItem('token');
  const { id } = router.query;

  const [product, setProduct] = useState<IProduct>({});
  
  async function handleGetProduct() {
    const response: ApiResponse<IProduct> = await getProduct(id.toString(), token);

    if (response.entity) {
      setProduct(response.entity)
    }
  }

  useEffect(() => {
    if (id && token) {
      handleGetProduct();
    }
  }, [id, token]);


  return (
    <LayoutAdmin>

      <Head>
        <title>Detalhes do produto</title>
      </Head>

      <>
        <h1 className="title">
          <Link href="/admin/products/list">
            <a title="Voltar para listagem de produtos" className="btn-back">
              &#8249;
            </a>
          </Link>
          {' '}
          Detalhes do produto
        </h1>

        <table className="table my-5 py-5">
          <thead>
            <tr>
              <td>#</td>
              <td>Nome</td>
              <td>Descrição</td>
              <td>Preço</td>
              <td>Estoque</td>
              <td>Tipo</td>
              <td>Categoria</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {product.id}
              </td>
              <td>
                {product.name}
              </td>
              <td>
                {product.description}
              </td>
              <td>
                {product.unitValue?.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
              </td>
              <td>
                {product.stockQuantity}
              </td>
              <td>
                {product?.productType?.name ?? ''}
              </td>
              <td>
                {product?.productCategory?.name ?? ''}
              </td>
            </tr>
          </tbody>
        </table>

      </>

    </LayoutAdmin>

  );
}