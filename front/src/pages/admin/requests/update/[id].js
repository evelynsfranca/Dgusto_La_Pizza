import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import Link from 'next/link';
import React, { useEffect, useState } from "react";
import LayoutAdmin from '../../../../components/Layout/layoutAdmin';
import { API_URL } from '../../../../utils/constants';

export default function RequestUpdate() {
  const router = useRouter();
  const { id } = router.query;
  const [token, setToken] = useState('');
  const [request, setRequest] = useState({
    id,
    status: '',
    totalValue: '',
    delivery: '',
  });

  async function handleUpdateRequest() {
    const res = await fetch(`${API_URL}/admin/requests`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
      body: JSON.stringify(request)
    })
      .then(res => res.json())
      .catch(e => console.warn(e));

    const response = await res;

    if (response) {
      router.push('/admin/requests/list')
    }
  }

  async function handleGetRequest() {
    const res = await fetch(`${API_URL}/admin/requests/${id}`, {
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
      setRequest(response)
    }
  }

  useEffect(() => {
    if (typeof window !== undefined && localStorage.getItem('token')) {

      setToken(localStorage.getItem('token'))
    }

    if (id && token) {
      handleGetRequest();
    }
  }, [id, token]);

  return (
    <LayoutAdmin>

      <Head>
        <title>Editando pedido</title>
      </Head>

      <>

        <h1 className="title">
          <Link href="/admin/requests/list">
            <a title="Voltar para listagem de pedidos" className="btn-back">
              &#8249;
            </a>
          </Link>
          {' '}
          Editando pedido
        </h1>

        <div className="row">
          <div className="col">

            <form className="form">

              <div className="mb-3">
                <label>
                  Número do pedido
                </label>
                <input
                  type="text"
                  readOnly
                  value={request.orderNumber}
                  className="form-control"
                />
              </div>

              <div className="mb-3">
                <label>
                  Status
                </label>
                  {request.status}
              </div>

              <button className="btn btn-secondary" onClick={handleUpdateRequest}>SALVAR</button>

            </form>

          </div>
        </div>

      </>

    </LayoutAdmin>
  );
}