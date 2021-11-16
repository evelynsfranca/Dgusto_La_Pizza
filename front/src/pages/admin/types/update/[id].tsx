import { getProductType, updateProductType } from 'api/admin/product-type';
import localStorage from 'localStorage';
import { ApiResponse } from 'model/ApiResponse';
import { IProductType } from 'model/IProductType';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from "react";
import LayoutAdmin from 'src/components/Layout/layoutAdmin';


export default function TypeUpdate() {

  const router = useRouter();
  const { id } = router.query;  
  const token = localStorage.getItem('token');

  const [type, setType] = useState<IProductType>({});

  async function handleUpdateType() {
    const response = await updateProductType(type, token);
    response.status === 201 && router.push('/admin/types/list')
  }

  async function handleGetType() {
    const response: ApiResponse<IProductType> = await getProductType(id.toString(), token);
    response.entity && setType(response.entity)
  }

  useEffect(() => {
    if (id && token) {
      handleGetType();
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

      <form className="form">
        <div className="mb-3">
        <label>
          Nome
        </label>
          <input
            className="form-control"
            type="text"
            value={type.name}
            onChange={name => setType({ ...type, name: name.target.value })}
          />
        </div>

        <button type="button" className="btn btn-secondary" onClick={handleUpdateType}>SALVAR</button>
      </form>
    </LayoutAdmin>
  );
}