import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import { useEffect, useState } from "react";
import NumberFormat from 'react-number-format';
import SweetAlert from 'react-bootstrap-sweetalert';
import useSWR from 'swr';
import LayoutAdmin from '../../../components/layout/admin';
import { API_URL } from '../../../utils/constants';

export default function ProductList() {
  const router = useRouter();
  const [token, setToken] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDeleteModal, setProductToDeleteModal] = useState(false);

  function openModalDelete(productId) {
    setProductToDeleteModal(productId)
    setShowDeleteModal(true)
  }

  async function confirmDelete() {
    const res = await fetch(`${API_URL}/admin/products/${productToDeleteModal}`, {
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

  function ApiProductsList({ token }) {

    if (!token) return <></>

    const router = useRouter();

    const fetcher = (url, token) => fetch(url, { headers: { "Authorization": token } })
      .then(res => res.json())
      .catch(e => console.warn(e))

    const { data, error } = useSWR([`${API_URL}/admin/products`, token], fetcher)

    if (error) return <tr rowSpan="4"><td>failed to load</td></tr>
    if (!data) return <tr rowSpan="4"><td>loading...</td></tr>

    return <>
      {data.content.map((product, index) => (
        <tr key={index}>
          <td>
            {product.name}
          </td>
          <td>
            <NumberFormat value={product.unitValue} displayType={'text'} thousandSeparator={true} prefix={'R$'} />
          </td>
          <td>
            {product.stockQuantity}
          </td>
          <td>
            <button type="button" className="btn btn-secondary" onClick={() => router.push(`/admin/products/detail/${product.id}`)} title="Visualizar">
              Ver
            </button>
            {' '}
            <button type="button" className="btn btn-primary" onClick={() => router.push(`/admin/products/update/${product.id}`)} title="Editar">
              Editar
            </button>
            {' '}
            <button type="button" className="btn btn-danger" onClick={() => openModalDelete(product.id)} title="Deletar">
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
  }, []);

  return (
    <LayoutAdmin>
      <Head>
        <title>Lista de Produtos</title>
      </Head>

      <h1 className="title">
        Lista de Produtos
      </h1>

      <button type="button" className="btn btn-primary" onClick={() => router.push('/admin/products/save')}>
        ADICIONAR PRODUTO
      </button>

      <table className="table my-5 py-5">
        <thead>
          <tr>
            <td>Sabor</td>
            <td>Preço</td>
            <td>Estoque</td>
            <td>Ações</td>
          </tr>
        </thead>
        <tbody>
          <ApiProductsList token={token} />

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
            Ao confirmar, você irá deletar o produto, esta ação não poderá ser revertida.
          </SweetAlert>
        </tbody>
      </table>

    </LayoutAdmin>
  );
}