import { getAllRequests } from 'api/admin/request';
import localStorage from 'localStorage';
import { ApiResponse } from 'model/ApiResponse';
import { IRequest } from 'model/IRequest';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import React, { useEffect, useState } from "react";
import LayoutAdmin from 'src/components/Layout/layoutAdmin';

export default function RequestsList() {
  const router = useRouter();
  const token = localStorage.getItem('token');
  const [requestList, setRequestList] = useState<IRequest[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  async function handleGetAllRequests() {
    setLoading(true)

    const response: ApiResponse<IRequest> = await getAllRequests(token);

    if (response.content.content) {
      setRequestList(response.content.content);
    } else {
      return <tr><td colSpan={4}>failed to load</td></tr>
    }
    
    if(response.status) setLoading(false);
  }
  useEffect(() => {
    if (token) {
      handleGetAllRequests();
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
            <td>ID</td>
            <td>Número do pedido</td>
            <td>Data</td>
            <td>Status</td>
            <td>Total</td>
            <td>Ações</td>
          </tr>
        </thead>
        <tbody>
          {loading && (
            <tr><td colSpan={4}>loading...</td></tr>
          )}      
          {requestList && requestList.length ? requestList.map((request, index) => (
            <tr key={index}>
              <td>
                {request.id.toString()}
              </td>
              <td>
                {request.orderNumber}
              </td>
              <td>
                {request.orderDate}
              </td>
              <td>
                {request.status}
                <br />
                {request.delivery}
              </td>
              <td>
                {request.totalValue.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })} 
              </td>
              <td>
                <button type="button" className="btn btn-secondary" onClick={() => router.push(`/admin/requests/detail/${request.id}`)} title="Visualizar">
                  Ver
                </button>
                {' '}
                <button type="button" className="btn btn-primary" onClick={() => router.push(`/admin/requests/update/${request.id}`)} title="Editar">
                  Editar
                </button>
              </td>
            </tr>
          )) : (null)}
        </tbody>
      </table>

    </LayoutAdmin>
  );
}