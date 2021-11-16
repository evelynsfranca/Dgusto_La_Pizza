import { getAllProductCategories, getAllProductTypes, getProduct, updateProduct } from 'api/admin/product';
import localStorage from 'localStorage';
import { ApiResponse } from 'model/ApiResponse';
import { IProduct } from 'model/IProduct';
import { IProductCategory } from 'model/IProductCategory';
import { IProductType } from 'model/IProductType';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import Link from 'next/link';
import React, { useEffect, useState } from "react";
import LayoutAdmin from 'src/components/Layout/layoutAdmin';

export default function ProductUpdate() {
  const router = useRouter();

  const { id } = router.query;
  const token = localStorage.getItem('token');
  
  const [product, setProduct] = useState<IProduct>({});
  const [productTypes, setProductTypes] = useState<IProductType[]>([]);
  const [productCategories, setProductCategories] = useState<IProductCategory[]>([]);

  async function handleUpdateProduct() {
    const response = await updateProduct(product, token);
    response.status === 201 && router.push('/admin/products/list')
  }

  async function handleGetProduct() {
    const response: ApiResponse<IProduct> = await getProduct(id.toString(), token);

    response.entity && setProduct(response.entity)
  }
  
  async function handleGetProductTypes() {
    const response: ApiResponse<IProductType> = await getAllProductTypes(token);

    if (response.content.content) {
      setProductTypes(response.content.content)
    }
  }

  async function handleGetProductCategories() {
    const response: ApiResponse<IProductCategory> = await getAllProductCategories(token)

    if (response.content.content) {
      setProductCategories(response.content.content)
    }
  }

  useEffect(() => {
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
                  onChange={value => setProduct({ ...product, unitValue: Number(value.target.value) })}
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
                  onChange={stockQuantity => setProduct({ ...product, stockQuantity: Number(stockQuantity.target.value) })}
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
                    value={product?.productType?.id.toString() ?? ''}
                    defaultValue={product?.productType?.id.toString() ?? ''}
                    onChange={selectType}
                    onSelect={selectType}
                  >
                    <option value=""></option>
                    {productTypes?.map(type => (
                      <React.Fragment key={type.id.toString()}>
                        <option value={type.id.toString()}>{type.name}</option>
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
                    value={product?.productCategory?.id.toString() ?? ''}
                    defaultValue={product?.productCategory?.id.toString() ?? ''}
                    onChange={selectCategory}
                    onSelect={selectCategory}
                  >
                    <option value=""></option>
                    {productCategories?.map(category => (
                      <React.Fragment key={category.id.toString()}>
                        <option value={category.id.toString()}>{category.name}</option>
                      </React.Fragment>
                    ))}
                  </select>
                )}
              </div>

              <button type="button" className="btn btn-secondary" onClick={handleUpdateProduct}>SALVAR</button>

            </form>

          </div>
        </div>

      </>

    </LayoutAdmin>
  );
}