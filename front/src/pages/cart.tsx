import { getClient } from 'api/client/client';
import { saveRequest } from 'api/client/request';
import localStorage from 'localStorage';
import _ from 'lodash';
import { PaymentMethod } from 'model/enum/PaymentMethod';
import { IClient } from 'model/IClient';
import { IProduct } from 'model/IProduct';
import { IRequest } from 'model/IRequest';
import { IRequestItem } from 'model/IRequestItem';
import Image from 'next/image';
import Link from 'next/link';
import router from 'next/router';
import React, { useEffect, useState } from 'react';
import LayoutGeneral from 'src/components/Layout/layoutGeneral';
import { paymentMethods, phoneTypes } from 'src/utils/constants';
import pizzas from '/public/images/products/sample.png';


function CartPage({ cartData, setCartData }) {
  const token = localStorage.getItem('token');
  const [userData, setUserData] = useState<IClient>({})
  const [isLoading, setIsLoading] = useState(false)
  const [isErrored, setIsErrored] = useState('')

  async function getData() {
    setIsLoading(true)

    const response = await getClient(token)

    if (response.entity) {
      setUserData(response.entity)
      setRequest({...request, address: {...request.address}, client: response.entity })
    } else {
      setIsErrored('Erro ao tentar carregar seus dados, tente novamente mais tarde.');
    }

    setIsLoading(false)

  }

  useEffect(() => {
    getData()
  }, [])

  const [newArrayProducts, setNewArrayProducts] = useState<IRequestItem[]>([]);
  const [cartSubTotal, setCartSubTotal] = useState(0);
  const [cartShipping, setCartShipping] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const [request, setRequest] = useState<IRequest>({});

  let groupedCartData = _.groupBy(cartData, 'id')

  const calculateCart = () => {
    let localNewArrayProducts = [];
    let subTotal = 0;
    _.map(groupedCartData, (it: IProduct[]) => {
      _.map(it, (e, i) => {
        if (i >= 1) {
          return
        } else {
          localNewArrayProducts.push({ product: e, quantity: it.length, totalValue: (e.unitValue * it.length) })
        }
      })
    })

    _.map(localNewArrayProducts, (request: IRequest) => {
      subTotal = Number(subTotal) + Number(request.totalValue);
    })

    setCartSubTotal(Number(subTotal));
    setCartShipping(0)
    setCartTotal(Number(subTotal) + Number(cartShipping))
    setNewArrayProducts(localNewArrayProducts);
  };

  const decrease = (id) => {
    console.log(id)
  }

  const increase = (id) => {
    console.log(id)
  }

  const removeProduct = (id) => {
    console.log(id)
  }

  const clearCartData = () => {
    setCartData([])
    localStorage.setItem('cart', JSON.stringify([]))

  }

  useEffect(() => {
    calculateCart()
  }, []);

  async function handleRequest() {
    setRequest({...request, address: {...request.address}, client: userData })
    const response = await saveRequest(request, token)
    if(response.status === 201) {
      router.push("user/my-purchases")
    }
  }
  const address = userData.addresses?.filter((address) => address.mainAddress)[0];
  const phone = userData.phones?.filter((phone) => phone.mainPhone)[0];

  useEffect(() => {
    setRequest({...request, address: {...request.address}, client: userData })
  }, [userData])

  useEffect(() => {
    setRequest({...request, client: { ...request.client }, address: address })
  }, [address])
  
  useEffect(() => {
    console.log(request)
  }, [request])

  useEffect(() => {
    setRequest({...request, client: { ...request.client }, requestItems: newArrayProducts})
  }, [newArrayProducts])

  
  return (
    <LayoutGeneral pageName="CartPage" cartData={cartData}>

      <main className="container">

        <div className="my-5 row justify-content-center">
          <div className="col">

            <div className="mb-4">

              <div className="card-body">

                {cartData.length == 0 &&
                  <div className="text-center">
                    <h2 className="mb-5">Nenhum produto em seu carrinho :(</h2>
                    <p>
                      Acesse a <Link href="/menu">lista de nossos produtos</Link> e adicione um produto para continuar comprando
                    </p>

                  </div>
                }

                {cartData.length > 0 &&
                  <>
                    <div className="table-responsive mb-4">

                      <div className="text-end">
                        <a className="btn btn-link mb-3 pe-0" href="#" onClick={() => clearCartData()}>
                          Limpar carrinho <i className="bi bi-trash"></i>
                        </a>
                      </div>

                      <table className="table table-borderless">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Produto</th>
                            <th scope="col">Quantidade</th>
                            <th scope="col">Preço</th>
                            <th scope="col" className="text-end">Total</th>
                          </tr>
                        </thead>
                        <tbody>

                          {_.map(newArrayProducts, (item, index) => (
                            <tr key={index}>
                              <th scope="row">
                                {index + 1}
                              </th>
                              <td>
                                  <div className="d-flex justify-content-start align-items-center">
                                    <div className="me-3">
                                      <Image src={pizzas} width={50} height={50} alt={item.product.name} />
                                    </div>
                                    <div>
                                      {item.product.name}
                                    </div>
                                  </div>
                              </td>
                              <td>
                                <div className="form-group mb-0 d-flex justify-content-between align-items-center">
                                  <div className="me-2">
                                    {item.quantity}x
                                  </div>

                                  <div className="buttons">
                                    {item.quantity > 1 &&
                                      <button type="button" className="btn btn-secondary me-2"
                                        onClick={() => decrease(item.product.id)}
                                      >
                                        <i className="bi bi-dash-circle"></i>
                                      </button>
                                    }

                                    {item.quantity === 1 &&
                                      <button type="button" className="btn btn-danger me-2"
                                        onClick={() => removeProduct(item.product.id)}
                                      >
                                        <i className="bi bi-trash"></i>
                                      </button>
                                    }

                                    <button type="button" className="btn btn-primary me-2"
                                      onClick={() => increase(item.product.id)}
                                    >
                                      <i className="bi bi-plus-circle"></i>
                                    </button>
                                  </div>
                                </div>
                              </td>
                              <td>
                                  {Number(item.product.unitValue).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                              </td>
                              <td className="text-end">
                                  {(Number(item.product.unitValue) * Number(item.quantity)).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                              </td>
                              <td>

                              <select 
                                id="type" 
                                name="type" 
                                onChange={it => setRequest({...request, paymentMethod: PaymentMethod[it.target.value] })}
                              >
                                {Object.values(PaymentMethod).map((type, index) => (
                                  <React.Fragment key={index}>
                                    {PaymentMethod[type] === index && (
                                      <option selected={PaymentMethod[index] === request?.paymentMethod?.toString()} value={PaymentMethod[type]}>{paymentMethods[PaymentMethod[index]]}</option>
                                    )}
                                  </React.Fragment>
                                ))}
                              </select>
                              </td>
                            </tr>
                          ))}

                        </tbody>
                      </table>

                    </div>

                    <div className="row">
                      <div className="col-md-12 order-2 order-lg-1 col-lg-5 col-xl-6">
                        <div className="order-note">
                          <form>
                            <div className="form-group mb-4">
                              <label htmlFor="specialNotes">
                                Deixe aqui seu recado:
                              </label>
                              <textarea className="form-control" name="specialNotes" id="specialNotes" placeholder="Recado ou observações aqui"></textarea>
                            </div>
                          </form>
                        </div>
                      </div>
                      <div className="col-md-12 order-1 order-lg-2 col-lg-7 col-xl-6">
                        <div className="order-total table-responsive ">
                          <table className="table table-borderless text-end">
                            <tbody>
                              <tr>
                                <td>Sub Total:</td>
                                <td>
                                  {cartSubTotal.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                                </td>
                              </tr>
                              <tr>
                                <td>Frete:</td>
                                <td>
                                  {cartShipping.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                                </td>
                              </tr>
                              <tr>
                                <td className="f-w-7 font-18">
                                  <h4>Valor Final:</h4>
                                </td>
                                <td className="f-w-7 font-18">
                                  <h4>
                                  {cartTotal.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                                  </h4>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                {address && (
                    <div className="row">
                      <div className="col">
                        <div className="card mb-3">
                          <div className="card-body">

                            {address?.street}, {address?.number} - {address?.neighborhood} - {address?.zipCode} <br />
                            {address?.city} - {address?.state} <br /><br />
                            {address?.mainAddress ? <span className="badge rounded-pill bg-primary">Endereço principal</span> : ''}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                <hr />

                <h3 className="mb-4">Telefone</h3>
                    <>
                    <div>{`(${phone?.areaCode}) ${phone?.number}`}</div>
                    <div>{`${phoneTypes[phone?.type] ?? ''}`}</div>
                    {phone?.mainPhone ? <span className="badge rounded-pill bg-primary">Telefone principal</span> : ''}
                    </>


                    <div className="row">
                      <div className="col-xs-12 col-md-6">
                      </div>
                      <div className="col-xs-12 col-md-6">
                        <button type="button" onClick={handleRequest}>
                            Finalizar Compra 
                        </button>
                      </div>
                    </div>
                  </>
                }

              </div>
            </div>
          </div>
        </div>

      </main>

    </LayoutGeneral>
  )
}

export default CartPage;