import Link from 'next/link';
import LayoutGeneral from 'src/components/Layout/layoutGeneral';
import Image from 'next/image';
import pizzas from '/public/images/products/sample.png';
import CurrencyFormat from 'react-currency-format';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import localStorage from 'localStorage';

export interface IProducts {
  id: Number | any;
  name: string;
  description: string;
  unitValue: number;
  productType: IProductType;
  qty: number;
  total: number;
}

export interface IProductType {
  id: Number;
}

function CartPage({ cartData, setCartData }) {
  const [newArrayProducts, setNewArrayProducts] = useState(null);
  const [cartSubTotal, setCartSubTotal] = useState(0);
  const [cartShipping, setCartShipping] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  let groupedCartData = _.groupBy(cartData, 'id')

  const calculateCart = () => {
    let localNewArrayProducts = [];
    let subTotal = 0;
    _.map(groupedCartData, (it: IProducts[]) => {
      _.map(it, (e, i) => {
        if (i >= 1) {
          return
        } else {
          localNewArrayProducts.push({ product: e, qty: it.length, total: (e.unitValue * it.length) })
        }
      })
    })

    _.map(localNewArrayProducts, (product: IProducts) => {
      subTotal = subTotal + product.total;
    })

    setCartSubTotal(subTotal);
    setCartShipping(0)
    setCartTotal(subTotal + cartShipping)
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

  return (
    <LayoutGeneral pageName="CartPage" cartData={cartData}>

      <main className="container">

        <div className="my-5 row justify-content-center">
          <div className="col">

            <div className="mb-4">

              <div className="card-body">

                {cartData.length == 0 &&
                  <div className="text-center">
                    <h2 className="mb-5">Nenhum produto em seu carrinho</h2>
                    <p>
                      Acesse a <Link href="/menu">lista de nossos produtos</Link> e adicione um produto para continuar comprando
                    </p>

                  </div>
                }

                {cartData.length > 0 &&
                  <>
                    <div className="table-responsive mb-4">

                      <div className="text-end">
                        <a className="btn btn-link mb-3" href="#" onClick={() => clearCartData()}>
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

                          {_.map(newArrayProducts, (productItem, index) => (
                            <tr key={index}>
                              <th scope="row">
                                {index + 1}
                              </th>
                              <td>
                                <Link href="/">
                                  <div className="d-flex justify-content-start align-items-center">
                                    <div className="me-3">
                                      <Image src={pizzas} width={50} height={50} alt={productItem.product.name} />
                                    </div>
                                    <div>
                                      {productItem.product.name}
                                    </div>
                                  </div>
                                </Link>
                              </td>
                              <td>
                                <div className="form-group mb-0 d-flex justify-content-between align-items-center">
                                  <div className="me-2">
                                    {productItem.qty}x
                                  </div>

                                  <div className="buttons">
                                    {productItem.qty > 1 &&
                                      <button type="button" className="btn btn-secondary me-2"
                                        onClick={() => decrease(productItem.product.id)}
                                      >
                                        <i className="bi bi-dash-circle"></i>
                                      </button>
                                    }

                                    {productItem.qty === 1 &&
                                      <button type="button" className="btn btn-danger me-2"
                                        onClick={() => removeProduct(productItem.product.id)}
                                      >
                                        <i className="bi bi-trash"></i>
                                      </button>
                                    }

                                    <button type="button" className="btn btn-primary me-2"
                                      onClick={() => increase(productItem.product.id)}
                                    >
                                      <i className="bi bi-plus-circle"></i>
                                    </button>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <CurrencyFormat
                                  value={productItem.product.unitValue}
                                  displayType={'text'}
                                  decimalSeparator={','}
                                  prefix={'R$ '}
                                  renderText={value => <>{value}</>}
                                />
                              </td>
                              <td className="text-end">
                                <CurrencyFormat
                                  value={productItem.total}
                                  displayType={'text'}
                                  decimalSeparator={','}
                                  prefix={'R$ '}
                                  renderText={value => <>{value}</>}
                                />
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
                              <div className="input-group">
                                <input type="search" className="form-control" placeholder="Eu tenho um desconto" aria-label="Search" aria-describedby="button-addonTags" />
                                <div className="input-group-append">
                                  <button className="input-group-text" type="button" id="button-addonTags">
                                    Aplicar!
                                  </button>
                                </div>
                              </div>
                            </div>
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
                                  <CurrencyFormat
                                    value={cartSubTotal}
                                    displayType={'text'}
                                    decimalSeparator={','}
                                    prefix={'R$ '}
                                    renderText={value => <>{value}</>}
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td>Frete:</td>
                                <td>
                                  <CurrencyFormat
                                    value={cartShipping}
                                    displayType={'text'}
                                    decimalSeparator={','}
                                    prefix={'R$ '}
                                    renderText={value => <>{value}</>}
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td className="f-w-7 font-18">
                                  <h4>Valor Final:</h4>
                                </td>
                                <td className="f-w-7 font-18">
                                  <h4>
                                    <CurrencyFormat
                                      value={cartTotal}
                                      displayType={'text'}
                                      decimalSeparator={','}
                                      prefix={'R$ '}
                                      renderText={value => <>{value}</>}
                                    />
                                  </h4>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-xs-12 col-md-6">
                      </div>
                      <div className="col-xs-12 col-md-6">
                        <Link href="/checkout">
                          <a className="btn btn-lg btn-success w-100 my-1">
                            Finalizar Compra <i className="ri-arrow-right-line ml-2"></i>
                          </a>
                        </Link>
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