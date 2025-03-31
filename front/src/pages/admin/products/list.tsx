import { deleteProduct, getAllProducts } from 'api/admin/product';
import localStorage from 'localStorage';
import { ApiResponse } from 'model/ApiResponse';
import { IProduct } from 'model/IProduct';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import { useEffect, useState } from "react";
import SweetAlert from 'react-bootstrap-sweetalert';
import LayoutAdmin from 'src/components/Layout/layoutAdmin';

export default function ProductList() {
  const router = useRouter();
  const token = localStorage.getItem('token');
  const [productList, setProductList] = useState<IProduct[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDeleteModal, setProductToDeleteModal] = useState('');
  const [loading, setLoading] = useState<boolean>(false);

  function openModalDelete(productId) {
    setProductToDeleteModal(productId)
    setShowDeleteModal(true)
  }

  async function confirmDelete() {
    const response = await deleteProduct(productToDeleteModal, token);

    if (!!response) {
      setShowDeleteModal(false)
      location.reload();
    }
  }

  async function handleGetAllProducts() {
    setLoading(true)

    const response: ApiResponse<IProduct> = await getAllProducts(token);

    if (response.content.content) {
      setProductList(response.content.content);
    } else {
      return <tr><td colSpan={4}>failed to load</td></tr>
    }
    
    if(response.status === 200) setLoading(false);
  }
  
  useEffect(() => {
    if (token) {
      handleGetAllProducts();
    }
  }, [token]);

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
          {loading && (
            <tr><td colSpan={4}>loading...</td></tr>
          )}          
          {productList && productList.length ? productList.map((product, index) => (
          <tr key={index}>
            <td>
              {product.name}
            </td>
            <td>
              {product.unitValue.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
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
      placeholder='Ao confirmar, você irá deletar o produto, esta ação não poderá ser revertida.'
      onConfirm={() => confirmDelete()}
      onCancel={() => setShowDeleteModal(false)}
      focusCancelBtn
    />

    </LayoutAdmin>
  );
}