import { useRouter } from 'next/dist/client/router';
import { useForm } from 'react-hook-form';
import Head from 'next/head';
import Link from 'next/link';
import React, { useEffect, useState } from "react";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { API_URL } from 'src/utils/constants';
import LayoutAdmin from 'src/components/Layout/layoutAdmin';

export default function ProductList() {

  const router = useRouter();

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

  const [token, setToken] = useState('');
  const [product, setProduct] = useState({
    name: '',
    description: '',
    unitValue: 0,
    stockQuantity: 0,
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
        "Authorization": localStorage.getItem('token')
      }
    })
      .then(res => res.json())
      .catch(e => console.warn(e));

    const response = await res;

    if (response) {
      setProductTypes(response.content)
    }
    else {
      setProductTypes(response.content = null)
    }
  }

  async function handleGetProductCategories() {
    const res = await fetch(`${API_URL}/admin/product-categories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem('token')
      }
    })
      .then(res => res.json())
      .catch(e => console.warn(e));

    const response = await res;

    if (response) {
      setProductCategories(response.content)
    }
    else {
      setProductCategories(response.content = null)
    }
  }

  useEffect(() => {
    if (typeof window !== undefined && localStorage.getItem('token')) {

      setToken(localStorage.getItem('token'))
    }

    handleGetProductCategories();
    handleGetProductTypes();
  }, [product]);

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
            onChange={unitValue => setProduct({ ...product, unitValue: unitValue.target.value })}
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
            onChange={stockQuantity => setProduct({ ...product, stockQuantity: stockQuantity.target.value })}
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
              value={product?.productType?.id ?? ''}
              defaultValue={product?.productType?.id ?? ''}
              onChange={selectType}
            >
              <option value=""></option>
              {productTypes?.map(type => (
                <option key={type.id} value={type.id}>{type.name}</option>
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
              value={product?.productCategory?.id ?? ''}
              defaultValue={product?.productCategory?.id ?? ''}
              onChange={selectCategory}
            >
              <option value=""></option>
              {productCategories?.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
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