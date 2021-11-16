import { deleteProductType, getAllProductTypes } from 'api/admin/product-type';
import localStorage from 'localStorage';
import { ApiResponse } from 'model/ApiResponse';
import { IProductType } from 'model/IProductType';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import React, { useEffect, useState } from "react";
import SweetAlert from 'react-bootstrap-sweetalert';
import LayoutAdmin from 'src/components/Layout/layoutAdmin';


export default function TypesList() {

  const router = useRouter();
  const token = localStorage.getItem('token');
  const [typeList, setTypeList] = useState<IProductType[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [typeToDeleteModal, setTypeToDeleteModal] = useState('');
  const [loading, setLoading] = useState<boolean>(false);

  function openModalDelete(typeId) {
    setTypeToDeleteModal(typeId)
    setShowDeleteModal(true)
  }

  async function confirmDelete() {
    const response = await deleteProductType(typeToDeleteModal, token);

    if (response.status === 200) {
      setShowDeleteModal(false)
      location.reload();
    }
  }

  async function handleGetAllTypes() {
    setLoading(true)

    const response: ApiResponse<IProductType> = await getAllProductTypes(token);

    if (response.content.content) {
      setTypeList(response.content.content);
    } else {
      return <tr><td colSpan={4}>failed to load</td></tr>
    }
    
    if(response.status === 200) setLoading(false);
  }
  
  useEffect(() => {
    if (token) {
      handleGetAllTypes();
    }
  }, [token]);

  return (
    <LayoutAdmin>
      <Head>
        <title>Lista de Tipos</title>
      </Head>

      <h1 className="title">
        Lista de Tipos
      </h1>

      <button type="button" className="btn btn-primary"  onClick={() => router.push('/admin/types/save')}>
        ADICIONAR TIPOS
      </button>

      <table className="table my-5 py-5">
        <thead>
          <tr>
            <td>Tipos</td>
            <td>Ações</td>
          </tr>
        </thead>
        <tbody>
          {loading && (
            <tr><td colSpan={4}>loading...</td></tr>
          )}         
          {typeList && typeList.length ? typeList.map((type, index) => (
            <tr key={index}>
              <td>
                {type.name}
              </td>
              <td>
                <button type="button" className="btn btn-secondary" onClick={() => router.push(`/admin/types/detail/${type.id}`)} title="Visualizar">
                  Ver
                </button>
                {' '}
                <button type="button" className="btn btn-primary" onClick={() => router.push(`/admin/types/update/${type.id}`)} title="Editar">
                  Editar
                </button>
                {' '}
                <button type="button" className="btn btn-danger" onClick={() => openModalDelete(type.id)} title="Deletar">
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
        Ao confirmar, você irá deletar o tipo, esta ação não poderá ser revertida.
      </SweetAlert>
      
    </LayoutAdmin>
  );
}