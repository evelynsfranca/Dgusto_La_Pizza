import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from "react";
import LayoutAdmin from '../../../components/layout/admin';
import { API_URL } from '../../../utils/constants';


export default function ProductList() {

  const router = useRouter();

  const [token, setToken] = useState('');
  const [product, setProduct] = useState({
    id: '',
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

  async function handleProduct() {
    const res = await fetch(`${API_URL}/admin/products`, {
      method: "POST",
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

  useEffect(() => {
    if (typeof window !== undefined && localStorage.getItem('token')) {

      setToken(localStorage.getItem('token'))
    }
  }, []);

  return (
    <LayoutAdmin>

      <Head>
        <title>Adicionar Novo Produto</title>
      </Head>

      <h1 className="title">
        <Link href="/admin/products/list">
          <a title="Voltar para listagem de produtos" className="btn-back">
            &#8249;
          </a>
        </Link>
        {' '}
        Adicionar Novo Produto
      </h1>

      <p className="form">
        <label>
          Nome
          <input
            type="text"
            onChange={name => setProduct({ ...product, name: name.target.value })}
          />
        </label>
        <label>
          Descrição
          <input
            type="text"
            onChange={description => setProduct({ ...product, description: description.target.value })}
          />
        </label>
        <label>
          Valor
          <input
            type="number"
            onChange={unitValue => setProduct({ ...product, unitValue: unitValue.target.value })}
          />
        </label>
        <label>
          Quantidade em estoque
          <input
            type="number"
            onChange={stockQuantity => setProduct({ ...product, stockQuantity: stockQuantity.target.value })}
          />
        </label>
        <label>
          Tipo
          <input
            type="text"
            onChange={productType => setProduct({ ...product, productType: { id: productType.target.value }})}
          />
        </label>
        <label>
          Categoria
          <input
            type="text"
            onChange={productCategory => setProduct({ ...product, productCategory: { id: productCategory.target.value }})}
          />
        </label>

        <button className="button-secondary" onClick={handleProduct}>SALVAR</button>
      </p>

    </LayoutAdmin>
  );
}