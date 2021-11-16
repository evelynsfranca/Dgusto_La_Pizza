import { saveProductType } from 'api/admin/product-type';
import localStorage from 'localStorage';
import { IProductType } from 'model/IProductType';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from "react";
import LayoutAdmin from 'src/components/Layout/layoutAdmin';


export default function ProductTypesAdd() {

  const router = useRouter();
  const token = localStorage.getItem('token');
  
  const [productType, setProductType] = useState<IProductType>({});

  async function handleType() {
    const response = await saveProductType(productType, token);

    if (response) {
      router.push('/admin/types/list')
    }
  }

  useEffect(() => console.log(productType), [productType])

  
  return (
    <LayoutAdmin>
      <Head>
        <title>Adicionar Nova Tipos</title>
      </Head>

      <h1 className="title">
        <Link href="/admin/productTypes/list">
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
            value={productType.name}
            onChange={event => setProductType({ ...productType, name: event.target.value })}
          />
        </div>

        <button type="button" className="btn btn-secondary" onClick={handleType}>SALVAR</button>
      </form>

    </LayoutAdmin>
  );
}