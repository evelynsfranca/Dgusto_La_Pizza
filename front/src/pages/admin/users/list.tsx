import { deleteUser, getAllUsers } from 'api/admin/user';
import localStorage from 'localStorage';
import { ApiResponse } from 'model/ApiResponse';
import { IUser } from 'model/IUser';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import React, { useEffect, useState } from "react";
import SweetAlert from 'react-bootstrap-sweetalert';
import LayoutAdmin from 'src/components/Layout/layoutAdmin';

export default function UserList() {

  const router = useRouter();
  const token = localStorage.getItem('token');
  const [userList, setUserList] = useState<IUser[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDeleteModal, setUsersToDeleteModal] = useState('');
  const [loading, setLoading] = useState<boolean>(false);

  async function handleGetAllUsers() {
    setLoading(true)

    const response: ApiResponse<IUser> = await getAllUsers(token);

    if (response.content.content) {
      setUserList(response.content.content);
    } else {
      return <tr><td colSpan={4}>failed to load</td></tr>
    }
    
    if(response.status) setLoading(false);
  }
  
  function openModalDelete(userId) {
    setUsersToDeleteModal(userId)
    setShowDeleteModal(true)
  }

  async function handlDeleteUser() {
    setLoading(true)

    const response: ApiResponse<void | number> = await deleteUser(userToDeleteModal, token);

    if (response.status === 200) {
      setShowDeleteModal(false)
      location.reload();
    } else {
      return <tr><td colSpan={4}>failed to delete</td></tr>
    }
    
    if(response.status) setLoading(false);
  }

  useEffect(() => {
    if (token) {
      handleGetAllUsers();
    }
  }, [token]);

  return (
    <LayoutAdmin>
      <Head>
        <title>Lista de Usuários</title>
      </Head>

      <h1 className="title">
        Lista de Usuários
      </h1>

      <button type="button" className="btn btn-primary" onClick={() => router.push('/admin/users/save')}>
        ADICIONAR USUÁRIO
      </button>

      <table className="table my-5 py-5">
        <thead>
          <tr>
            <td>ID</td>
            <td>Nome</td>
            <td>Email</td>
            <td>Ações</td>
          </tr>
        </thead>
        <tbody>
          {loading && (
            <tr><td colSpan={4}>loading...</td></tr>
          )}          
          {userList && userList?.length ? userList.map((user, index) => (
            <tr key={index}>
              <td>{user.id.toString()}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button type="button" className="btn btn-secondary" onClick={() => router.push(`/admin/users/detail/${user.id}`)} title="Visualizar">
                  Ver
                </button>
                <button type="button" className="btn btn-primary" onClick={() => router.push(`/admin/users/update/${user.id}`)} title="Editar">
                  Editar
                </button>
                <button type="button" className="btn btn-danger" onClick={() => openModalDelete(user.id)} title="Deletar">
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
        placeholder='Ao confirmar, você irá deletar o usuário, esta ação não poderá ser revertida.'
        onConfirm={handlDeleteUser}
        onCancel={() => setShowDeleteModal(false)}
        focusCancelBtn
      />
    </LayoutAdmin>
  );
}