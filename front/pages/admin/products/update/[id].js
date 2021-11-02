import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import Link from 'next/link';
import React, { useEffect, useState } from "react";
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

    if (id && token) {
      handleGetProduct();
      handleGetProductCategories();
      handleGetProductTypes();
    }
  }, [id, token]);

  function selectType(event) {
    setProduct({ ...product, productType: { ...product.productType, id: event.target.value, name: productTypes.find(it => it.id == event.target.value).name } })
  }

  function selectCategory(event) {
    setProduct({ ...product, productCategory: { ...product.productCategory, id: event.target.value, name: productCategories.find(it => it.id == event.target.value).name } });
  }

  return (
    <LayoutAdmin>

      <Head>
        <title>Editando produto</title>
      </Head>

      <>

        <h1 className="title">
          <Link href="/admin/products/list">
            <a title="Voltar para listagem de produtos" className="btn-back">
              &#8249;
            </a>
          </Link>
          {' '}
          Editando produto
        </h1>

        <div className="row">
          <div className="col">

            <form className="form">

              <div className="mb-3">
                <label>
                  Nome
                </label>
                <input
                  type="text"
                  value={product.name}
                  className="form-control"
                  onChange={name => setProduct({ ...product, name: name.target.value })}
                />
              </div>

              <div className="mb-3">
                <label>
                  Descrição
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={product.description}
                  onChange={description => setProduct({ ...product, description: description.target.value })}
                />
              </div>

              <div className="mb-3">
                <label>
                  Valor
                </label>
                <input
                  type="number"
                  className="form-control"
                  value={product.unitValue}
                  onChange={value => setProduct({ ...product, unitValue: value.target.value })}
                />
              </div>

              <div className="mb-3">
                <label>
                  Quantidade em estoque
                </label>
                <input
                  type="number"
                  className="form-control"
                  value={product.stockQuantity}
                  onChange={stockQuantity => setProduct({ ...product, stockQuantity: stockQuantity.target.value })}
                />
              </div>

              <div className="mb-3">
                <label>
                  Selecione um Tipo
                </label>
                {productTypes?.length && (
                  <select
                    name="type"
                    className="form-select"
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
              </div>

              <div className="mb-3">
                <label>
                  Selecione uma Categoria
                </label>
                {productCategories?.length && (
                  <select
                    className="form-select"
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
              </div>

              <button className="btn btn-secondary" onClick={handleUpdateProduct}>SALVAR</button>

            </form>

          </div>
        </div>

      </>

    </LayoutAdmin>
  );
}