import { yupResolver } from '@hookform/resolvers/yup';
import { getAllProductCategories, getAllProductTypes, saveProduct } from 'api/admin/product';
import localStorage from 'localStorage';
import { ApiResponse } from 'model/ApiResponse';
import { IProduct } from 'model/IProduct';
import { IProductCategory } from 'model/IProductCategory';
import { IProductType } from 'model/IProductType';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import Link from 'next/link';
import React, { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import LayoutAdmin from 'src/components/Layout/layoutAdmin';
import * as Yup from 'yup';

export default function ProductList() {

  const router = useRouter();

  const token = localStorage.getItem('token');
  const [product, setProduct] = useState<IProduct>({});
  const [productTypes, setProductTypes] = useState<IProductType[]>([]);
  const [productCategories, setProductCategories] = useState<IProductCategory[]>([]);

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('O Nome é obrigatório'),
    description: Yup.string()
      .required('A Descrição é obrigatório'),
    unitValue: Yup.string()
      .required('O Valor é obrigatório'),
    stockQuantity: Yup.string()
      .required('A Quantidade é obrigatório'),
    type: Yup.string()
      .required('O Tipo é obrigatório'),
    category: Yup.string()
      .required('A Categoria é obrigatório')
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  async function handleProduct() {
    const response: ApiResponse<IProduct> = await saveProduct(product, token);

    if (response.status === 201) {
      router.push('/admin/products/list')
    }
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
    if (token) {
      handleGetProductCategories();
      handleGetProductTypes();
    }
  }, [token]);

  function selectType(event) {
    setProduct({ ...product, productType: { ...product.productType, id: event.target.value, name: productTypes.find(it => it.id == event.target.value).name } })
  }

  function selectCategory(event) {
    setProduct({ ...product, productCategory: { ...product.productCategory, id: event.target.value, name: productCategories.find(it => it.id == event.target.value).name } });
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

      <form className="form" onSubmit={handleSubmit(handleProduct)}>

        <div className="mb-3">
          <label>
            Nome
          </label>
          <input
            type="text"
            {...register('name')} className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            onChange={name => setProduct({ ...product, name: name.target.value })}
          />
          <div className="invalid-feedback">{errors.name?.message}</div>
        </div>

        <div className="mb-3">
          <label>
            Descrição
          </label>
          <input
            type="text"
            {...register('description')} className={`form-control ${errors.description ? 'is-invalid' : ''}`}
            onChange={description => setProduct({ ...product, description: description.target.value })}
          />
          <div className="invalid-feedback">{errors.description?.message}</div>
        </div>

        <div className="mb-3">
          <label>
            Valor
          </label>
          <input
            type="number"
            min="0"
            {...register('unitValue')} className={`form-control ${errors.unitValue ? 'is-invalid' : ''}`}
            onChange={unitValue => setProduct({ ...product, unitValue: Number(unitValue.target.value) })}
          />
          <div className="invalid-feedback">{errors.unitValue?.message}</div>
        </div>

        <div className="mb-3">
          <label>
            Quantidade em estoque
          </label>
          <input
            type="number"
            min="0"
            {...register('stockQuantity')} className={`form-control ${errors.stockQuantity ? 'is-invalid' : ''}`}
            onChange={stockQuantity => setProduct({ ...product, stockQuantity: Number(stockQuantity.target.value) })}
          />
          <div className="invalid-feedback">{errors.stockQuantity?.message}</div>
        </div>

        <div className="mb-3">
          <label>
            Selecione um Tipo
          </label>
          {productTypes?.length && (
            <select
              name="type"
              {...register('type')} className={`form-select ${errors.type ? 'is-invalid' : ''}`}
              value={product?.productType?.id.toString() ?? ''}
              defaultValue={product?.productType?.id.toString() ?? ''}
              onChange={selectType}
            >
              <option value=""></option>
              {productTypes?.map(type => (
                <option key={type.id.toString()} value={type.id.toString()}>{type.name}</option>
              ))}
            </select>
          )}
          <div className="invalid-feedback">{errors.type?.message}</div>
        </div>

        <div className="mb-3">
          <label>
            Selecione uma Categoria
          </label>
          {productCategories?.length && (
            <select
              name="category"
              {...register('category')} className={`form-select ${errors.category ? 'is-invalid' : ''}`}
              value={product?.productCategory?.id.toString() ?? ''}
              defaultValue={product?.productCategory?.id.toString() ?? ''}
              onChange={selectCategory}
            >
              <option value=""></option>
              {productCategories?.map(category => (
                <option key={category.id.toString()} value={category.id.toString()}>{category.name}</option>
              ))}
            </select>
          )}
          <div className="invalid-feedback">{errors.category?.message}</div>
        </div>


        <button type="submit" className="btn btn-secondary">SALVAR</button>
      </form>

    </LayoutAdmin>
  );
}