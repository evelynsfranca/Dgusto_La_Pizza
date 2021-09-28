import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from "react";
import logo from '/public/images/logo.png';
import { API_URL } from '../../../utils/constants';
import LayoutAdmin from '../../../components/layout/admin';


export default function ProductList() {

  const router = useRouter();

  const [token, setToken] = useState('');
  const [product, setProduct] = useState({
    id: '',
    name: '',
    description: '',
    value: 0,
    stockQuantity: '',
    productType: ''
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
        <title>Adicionar novos produtos</title>
      </Head>

      <h1 className="title">
        <Link href="/admin/products/list">
          <a title="Voltar para listagem de produtos" className="btn-back">
            &#8249;
          </a>
        </Link>
        {' '}
        Adicionar novos produtos
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
            value={product.value}
            onChange={value => setProduct({ ...product, value: value.target.value })}
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
            value={product.productType}
            onChange={productType => setProduct({ ...product, productType: productType.target.value })}
          />
        </label>

        <button className="button-secondary" onClick={handleProduct}>SALVAR</button>
      </p>

    </LayoutAdmin>
  );
}