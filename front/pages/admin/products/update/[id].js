import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from "react";
import LayoutAdmin from '../../../../components/layout/admin';
import { API_URL } from '../../../../utils/constants';


export default function ProductUpdate() {

  const router = useRouter();

  const { id } = router.query;

  const [token, setToken] = useState('');
  const [product, setProduct] = useState({
    id,
    name: '',
    description: '',
    unitValue: 0,
    stockQuantity: '',
    productType: {
      id: ''
    },
    productCategory: {
      id: ''
    }

  });

  async function handleUpdateProduct() {
    const res = await fetch(`${API_URL}/admin/products`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
      body: JSON.stringify(product)
    })
      .then(res => res.json())
      .catch(e => console.warn(e));

    const response = await res;

    if (response) {
      router.push('/admin/products/list')
    }
  }

  async function handleGetProduct() {
    const res = await fetch(`${API_URL}/admin/products/${id}`, {
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
      setProduct(response)
    }
  }

  useEffect(() => {
    if (typeof window !== undefined && localStorage.getItem('token')) {

      setToken(localStorage.getItem('token'))
    }

    if (id && token) {
      handleGetProduct();
    }
  }, [id, token]);

  return (
    <LayoutAdmin>

      <Head>
        <title>Editando do produto</title>
      </Head>

      <>

        <h1 className="title">
          <Link href="/admin/products/list">
            <a title="Voltar para listagem de produtos" className="btn-back">
              &#8249;
            </a>
          </Link>
          {' '}
          Editando do produto
        </h1>

        <p className="form">
          <label>
            Nome
            <input
              type="text"
              value={product.name}
              onChange={name => setProduct({ ...product, name: name.target.value })}
            />
          </label>
          <label>
            Descrição
            <input
              type="text"
              value={product.description}
              onChange={description => setProduct({ ...product, description: description.target.value })}
            />
          </label>
          <label>
            Valor
            <input
              type="number"
              value={product.unitValue}
              onChange={value => setProduct({ ...product, unitValue: value.target.value })}
            />
          </label>
          <label>
            Quantidade em estoque
            <input
              type="number"
              value={product.stockQuantity}
              onChange={stockQuantity => setProduct({ ...product, stockQuantity: stockQuantity.target.value })}
            />
          </label>
          <label>
            Tipo
            <input
              type="text"
              value={product.productType || ''}
              onChange={productType => setProduct({ ...product, productType: { id: productType.target.value } })}
            />
          </label>
          <label>
            Categoria
            <input
              type="text"
              value={product.productCategory || ''}
              onChange={productCategory => setProduct({ ...product, productCategory: { id: productCategory.target.value } })}
            />
          </label>

          <button className="button-secondary" onClick={handleUpdateProduct}>SALVAR</button>
        </p>

      </>

    </LayoutAdmin>
  );
}