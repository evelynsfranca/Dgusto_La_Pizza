import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import { useEffect, useState } from "react";
import SweetAlert from 'react-bootstrap-sweetalert';
import NumberFormat from 'react-number-format';
import useSWR from 'swr';
import LayoutAdmin from '../../../components/Layout/layoutAdmin';
import { API_URL } from '../../../utils/constants';

export default function RequestsList() {
  const router = useRouter();
  const [token, setToken] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [requestsToDeleteModal, setRequestsToDeleteModal] = useState(false);

  function openModalDelete(requestsId) {
    setRequestsToDeleteModal(requestsId)
    setShowDeleteModal(true)
  }

  async function confirmDelete() {
    const res = await fetch(`${API_URL}/admin/requests/${requestsToDeleteModal}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      }
    })
      .then(res => res)
      .catch(e => console.warn(e));

    const response = await res;

    if (!!response) {
      setShowDeleteModal(false)
      location.reload();
    }
  }

  function ApiRequestsList({ token }) {

    if (!token) return <></>

    const router = useRouter();

    const fetcher = (url, token) => fetch(url, { headers: { "Authorization": token } })
      .then(res => res.json())
      .catch(e => console.warn(e))

    const { data, error } = useSWR([`${API_URL}/admin/requests`, token], fetcher)

    if (error) return <tr><td colSpan="4">failed to load</td></tr>
    if (!data) return <tr><td colSpan="4">loading...</td></tr>

    return <>
      {data.content?.map((requests, index) => (
        <tr key={index}>
          <td>
            {requests.orderNumber}
          </td>
          <td>
            {requests.orderDate}
          </td>
          <td>
            {requests.status}
            <br />
            {requests.delivery}
          </td>
          <td>
            <NumberFormat value={requests.totalValue} displayType={'text'} thousandSeparator={true} prefix={'R$'} />
          </td>
          <td>
            <button type="button" className="btn btn-secondary" onClick={() => router.push(`/admin/requests/detail/${requests.id}`)} title="Visualizar">
              Ver
            </button>
            {' '}
            <button type="button" className="btn btn-primary" onClick={() => router.push(`/admin/requests/update/${requests.id}`)} title="Editar">
              Editar
            </button>
            {' '}
            <button type="button" className="btn btn-danger" onClick={() => openModalDelete(requests.id)} title="Deletar">
              Deletar
            </button>
          </td>
        </tr>
      ))}
    </>
  }

  useEffect(() => {
    if (typeof window !== undefined && localStorage.getItem('token')) {

      setToken(localStorage.getItem('token'))
    }
  }, [token]);

  return (
    <LayoutAdmin>
      <Head>
        <title>Lista de Pedidos</title>
      </Head>

      <h1 className="title">
        Lista de Pedidos
      </h1>

      <table className="table my-5 py-5">
        <thead>
          <tr>
            <td>Número do pedido</td>
            <td>Data</td>
            <td>Status</td>
            <td>Total</td>
            <td>Ações</td>
          </tr>
        </thead>
        <tbody>
          <ApiRequestsList token={token} />

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
            Ao confirmar, você irá deletar o pedido, esta ação não poderá ser revertida.
          </SweetAlert>
        </tbody>
      </table>

    </LayoutAdmin>
  );
}