import { getRequest, updateRequest } from 'api/admin/request';
import localStorage from 'localStorage';
import { ApiResponse } from 'model/ApiResponse';
import { RequestStatus } from 'model/enum/RequestStatus';
import { IRequest } from 'model/IRequest';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import Link from 'next/link';
import React, { useEffect, useState } from "react";
import LayoutAdmin from 'src/components/Layout/layoutAdmin';

export default function RequestUpdate() {
  const router = useRouter();

  const { id } = router.query;
  const token = localStorage.getItem('token');
  
  const [request, setRequest] = useState<IRequest>({});

  async function handleUpdateRequest() {
    const response = await updateRequest(request, token);
    response.status === 201 && router.push('/admin/requests/list')
  }

  async function handleGetRequest() {
    const response: ApiResponse<IRequest> = await getRequest(id.toString(), token);

    response.entity && setRequest(response.entity)
  }

  useEffect(() => {
    id && token && handleGetRequest();
  }, [id, token]);

  return (
    <LayoutAdmin>

      <Head>
        <title>Editando pedido</title>
      </Head>
    
      <h1 className="title">
        <Link href="/admin/requests/list">
          <a title="Voltar para listagem de pedidos" className="btn-back">
            &#8249;
          </a>
        </Link>
        {' '}
        Editando pedido
      </h1>

      <>
        <div className="title">
          Detalhes do pedido
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <select 
            name="status" 
            id="status" 
            onChange={it => setRequest({...request, status: RequestStatus[it.target.value] })}>
            {Object.values(RequestStatus).map((status, index) => (
              <>
                {RequestStatus[status] === index && (
                  <option value={RequestStatus[status]}>{RequestStatus[index]}</option>
                )}
              </>
            ))}
          </select>
          <button 
            type="button" 
            className="btn btn-secondary" 
            onClick={handleUpdateRequest}
          >
              SALVAR
          </button>
        </div>

        <div>Dados do Cliente</div>

        <table className="table my-5 py-5">
          <thead>
            <tr>
              <td>Data do pedido</td>
              <td>Número do pedido</td>
              <td>Cliente</td>
            </tr>
          </thead>
          <tbody>
            {request && (
              <tr>
                <td>
                  {new Date(request.orderDate).toLocaleString('pt-br', { timeZone: 'UTC' })}
                </td>
                <td>
                  {request.orderNumber}
                </td>
                <td>
                  {request.client?.name}
                </td>
             </tr>
            )}
          </tbody>
        </table>

        <div>Produtos</div>

        <table className="table my-5 py-5">
          <thead>
            <tr>
              <td>Quatidade</td>
              <td>Produto</td>
              <td>Categoria</td>
              <td>Tipo</td>
              <td>Valor unitário</td>
            </tr>
          </thead>
          <tbody>
            {request.requestItems && request.requestItems.length ? request.requestItems.map((item, index) => (
                <tr key={index}>
                  <td>
                    {item.quantity}
                  </td>
                  <td>
                    {item.product.name}
                  </td>
                  <td>
                    {item.product.productCategory.name}
                  </td>
                  <td>
                    {item.product.productType.name}
                  </td>
                  <td>
                    {item.product.unitValue.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                  </td>
              </tr>
              )) : (null)}
          </tbody>
        </table>

        <div>Dados de entrega</div>

        
        <table className="table my-5 py-5">
          <thead>
            <tr>
              <td>Rua</td>
              <td>Número</td>
              <td>Complemento</td>
              <td>Bairro</td>
            </tr>
          </thead>
          <tbody>
            {request.address && (
              <tr>
                <td>
                  {request.address.street}
                </td>
                <td>
                  {request.address.number}
                </td>
                <td>
                  {request.address.complement}
                </td>
                <td>
                  {request.address.neighborhood}
                </td>
             </tr>
            )}
          </tbody>
        </table>

        <div>Valor total: {request?.totalValue?.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</div>

      </>

    </LayoutAdmin>
  );
}