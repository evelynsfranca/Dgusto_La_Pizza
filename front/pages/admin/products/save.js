import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import Link from 'next/link';
import React, { useEffect, useState } from "react";
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
      id: '',
      name: ''
    },
    productCategory: {
      id: '',
      name: ''
    }
  });

  const [productTypes, setProductTypes] = useState([{
    id: '',
    name: ''
  }]);

  const [productCategories, setProductCategories] = useState([{
    id: '',
    name: ''
  }]);

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

  async function handleGetProductTypes() {
    const res = await fetch(`${API_URL}/admin/product-types`, {
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
      setProductTypes(response.content)
    }
  }

  async function handleGetProductCategories() {
    const res = await fetch(`${API_URL}/admin/product-categories`, {
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
      setProductCategories(response.content)
    }
  }


  useEffect(() => {
    if (typeof window !== undefined && localStorage.getItem('token')) {

      setToken(localStorage.getItem('token'))
    }

    handleGetProductCategories();
    handleGetProductTypes();
  }, []);

  function selectType(event) {
    setProduct({ ...product, productType: { ...product.productType, id: event.target.value, name: productTypes.find(it => it.id == event.target.value).name } })
  }

  function selectCategory(event) {
    setProduct({ ...product, productCategory: { ...product.productCategory, id:  event.target.value, name: productCategories.find(it => it.id == event.target.value).name } });
  }

  
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
            Selecione um Tipo
            {productTypes?.length && (
              <select 
                name="type"
                value={product?.productType?.id ?? ''} 
                defaultValue={product?.productType?.id ?? ''}
                onChange={selectType}
                onSelect={selectType}
              >
              <option value=""></option>
                {productTypes?.map(type => (
                  <React.Fragment key={type.id}>
                    <option value={type.id}>{type.name}</option>
                  </React.Fragment>
                ))}
              </select>
            )}
          </label>
          <label>
            Selecione uma Categoria
            {productCategories?.length && (
              <select 
                name="category"
                value={product?.productCategory?.id ?? ''} 
                defaultValue={product?.productCategory?.id ?? ''}
                onChange={selectCategory}
                onSelect={selectCategory}
              >
              <option value=""></option>
                {productCategories?.map(category => (
                  <React.Fragment key={category.id}>
                    <option value={category.id}>{category.name}</option>
                  </React.Fragment>
                ))}
              </select>
            )}
          </label>

        <button className="button-secondary" onClick={handleProduct}>SALVAR</button>
      </p>

    </LayoutAdmin>
  );
}