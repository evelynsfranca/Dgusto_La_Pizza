import { getAllProductCategories } from 'api/admin/product';
import { deleteProductCategory } from 'api/admin/product-category';
import localStorage from 'localStorage';
import { ApiResponse } from 'model/ApiResponse';
import { IProductCategory } from 'model/IProductCategory';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import React, { useEffect, useState } from "react";
import SweetAlert from 'react-bootstrap-sweetalert';
import LayoutAdmin from 'src/components/Layout/layoutAdmin';


export default function CategoriesList() {

  const router = useRouter();
  const token = localStorage.getItem('token');
  const [categoryList, setCategoryList] = useState<IProductCategory[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categoryToDeleteModal, setCategoryToDeleteModal] = useState('');
  const [loading, setLoading] = useState<boolean>(false);

  function openModalDelete(categoryId) {
    setCategoryToDeleteModal(categoryId)
    setShowDeleteModal(true)
  }

  async function confirmDelete() {
    const response = await deleteProductCategory(categoryToDeleteModal, token);

    if (response.status === 200) {
      setShowDeleteModal(false)
      location.reload();
    }
  }

  async function handleGetAllCategories() {
    setLoading(true)

    const response: ApiResponse<IProductCategory> = await getAllProductCategories(token);

    if (response.content.content) {
      setCategoryList(response.content.content);
    } else {
      return <tr><td colSpan={4}>failed to load</td></tr>
    }
    
    if(response.status === 200) setLoading(false);
  }
  
  useEffect(() => {
    if (token) {
      handleGetAllCategories();
    }
  }, [token]);

  return (
    <LayoutAdmin>
      <Head>
        <title>Lista de Categorias</title>
      </Head>

      <h1 className="title">
        Lista de Categorias
      </h1>

      <button type="button" className="btn btn-primary" onClick={() => router.push('/admin/categories/save')}>
        ADICIONAR CATEGORIA
      </button>

      <table className="table my-5 py-5">
        <thead>
          <tr>
            <td>Categoria</td>
            <td>Ações</td>
          </tr>
        </thead>
        <tbody>
          {loading && (
            <tr><td colSpan={4}>loading...</td></tr>
          )}         
          {categoryList && categoryList.length ? categoryList.map((category, index) => (
            <tr key={index}>
              <td>
                {category.name}
              </td>
              <td>
                <button type="button" className="btn btn-secondary" onClick={() => router.push(`/admin/categories/detail/${category.id}`)} title="Visualizar">
                  Ver
                </button>
                {' '}
                <button type="button" className="btn btn-primary" onClick={() => router.push(`/admin/categories/update/${category.id}`)} title="Editar">
                  Editar
                </button>
                {' '}
                <button type="button" className="btn btn-danger" onClick={() => openModalDelete(category.id)} title="Deletar">
                  Deletar
                </button>
              </td>
            </tr>
          )) : (null)}
        </tbody>
      </table>

      <SweetAlert
        show={showDeleteModal}
        warning
        showCancel
        cancelBtnText="Cancelar"
        confirmBtnText="Deletar"
        confirmBtnBsStyle="danger"
        title="Deseja mesmo deletar?"
        onConfirm={() => confirmDelete()}
        onCancel={() => setShowDeleteModal(false)}
        focusCancelBtn
      >
        Ao confirmar, você irá deletar a categoria, esta ação não poderá ser revertida.
      </SweetAlert>
    </LayoutAdmin>
  );
}