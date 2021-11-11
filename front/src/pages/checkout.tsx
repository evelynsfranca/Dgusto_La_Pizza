import Link from 'next/link';
import LayoutGeneral from 'src/components/Layout/layoutGeneral';
import Image from 'next/image';
import pizzas from '/public/images/products/sample.png';
import CurrencyFormat from 'react-currency-format';
import _ from 'lodash';
import { useEffect, useState } from 'react';

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

function CheckoutPage({ cartData, setCartData }) {
  const [state, setState] = useState({})
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

  function handleChange(evt) {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  }

  useEffect(() => {
    calculateCart()
  }, []);

  return (
    <LayoutGeneral pageName="CheckoutPage" cartData={cartData}>

      <main className="container my-5">

        <div className="row g-5">
          <div className="col-md-5 col-lg-4 order-md-last">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-primary">Meu carrinho</span>
              <span className="badge bg-primary rounded-pill">
                {cartData.length}
              </span>
            </h4>
            <ul className="list-group mb-3">

              {_.map(newArrayProducts, (productItem, index) => (
                <li key={index} className="list-group-item d-flex justify-content-between lh-sm">
                  <div>
                    <h6 className="my-0">
                      {productItem.product.name}
                    </h6>
                    <small className="text-muted">
                      {productItem.qty}x
                    </small>
                  </div>
                  <span className="text-muted">
                    <CurrencyFormat
                      value={productItem.product.unitValue}
                      displayType={'text'}
                      decimalSeparator={','}
                      prefix={'R$ '}
                      renderText={value => <>{value}</>}
                    />

                  </span>
                </li>
              ))}

              <li className="list-group-item d-flex justify-content-between">
                <span>Total</span>
                <strong>
                  <CurrencyFormat
                    value={cartTotal}
                    displayType={'text'}
                    decimalSeparator={','}
                    prefix={'R$ '}
                    renderText={value => <>{value}</>}
                  />
                </strong>
              </li>
            </ul>

            {/* <form className="card p-2">
              <div className="input-group">
                <input type="text" className="form-control" placeholder="Promo code"
                  onChange={handleChange}
                />
                <button type="submit" className="btn btn-secondary">Redeem</button>
              </div>
            </form> */}

            <div className="my-5">
              <button className="w-100 btn btn-primary btn-lg">
                Finalizar Compra!
              </button>
            </div>

          </div>

          <div className="col-md-7 col-lg-8">

            <h4 className="mb-3">Billing address</h4>

            <form className="needs-validation" >

              <div className="row g-3 mb-3">
                <div className="col-sm-6">
                  <label htmlFor="firstName" className="form-label">First name</label>
                  <input type="text" className="form-control" id="firstName" placeholder="" required
                    onChange={handleChange}
                  />
                  <div className="invalid-feedback">
                    Valid first name is required.
                  </div>
                </div>

                <div className="col-sm-6">
                  <label htmlFor="lastName" className="form-label">Last name</label>
                  <input type="text" className="form-control" id="lastName" placeholder="" required
                    onChange={handleChange}
                  />
                  <div className="invalid-feedback">
                    Valid last name is required.
                  </div>
                </div>

                <div className="col-12">
                  <label htmlFor="username" className="form-label">Username</label>
                  <div className="input-group has-validation">
                    <span className="input-group-text">@</span>
                    <input type="text" className="form-control" id="username" placeholder="Username" required
                      onChange={handleChange}
                    />
                    <div className="invalid-feedback">
                      Your username is required.
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <label htmlFor="email" className="form-label">Email <span className="text-muted">(Optional)</span></label>
                  <input type="email" className="form-control" id="email" placeholder="you@example.com"
                    onChange={handleChange}
                  />
                  <div className="invalid-feedback">
                    Please enter a valid email address for shipping updates.
                  </div>
                </div>

                <div className="col-12">
                  <label htmlFor="address" className="form-label">Address</label>
                  <input type="text" className="form-control" id="address" placeholder="1234 Main St" required
                    onChange={handleChange}
                  />
                  <div className="invalid-feedback">
                    Please enter your shipping address.
                  </div>
                </div>

                <div className="col-12">
                  <label htmlFor="address2" className="form-label">Address 2 <span className="text-muted">(Optional)</span></label>
                  <input type="text" className="form-control" id="address2" placeholder="Apartment or suite"
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-5">
                  <label htmlFor="country" className="form-label">Country</label>
                  <select className="form-select" id="country" required>
                    <option value="">Choose...</option>
                    <option>United States</option>
                  </select>
                  <div className="invalid-feedback">
                    Please select a valid country.
                  </div>
                </div>

                <div className="col-md-4">
                  <label htmlFor="state" className="form-label">State</label>
                  <select className="form-select" id="state" required>
                    <option value="">Choose...</option>
                    <option>California</option>
                  </select>
                  <div className="invalid-feedback">
                    Please provide a valid state.
                  </div>
                </div>

                <div className="col-md-3">
                  <label htmlFor="zip" className="form-label">Zip</label>
                  <input type="text" className="form-control" id="zip" placeholder="" required
                    onChange={handleChange}
                  />
                  <div className="invalid-feedback">
                    Zip code required.
                  </div>
                </div>
              </div>

              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="same-address"
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="same-address">Shipping address is the same as my billing address</label>
              </div>

              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="save-info"
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="save-info">Save this information for next time</label>
              </div>

              <h4 className="mt-5 mb-3">Payment</h4>

              <div className="my-3">
                <div className="form-check">
                  <input id="credit" name="paymentMethod" type="radio" className="form-check-input" checked required
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="credit">Credit card</label>
                </div>
                <div className="form-check">
                  <input id="debit" name="paymentMethod" type="radio" className="form-check-input" required
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="debit">Debit card</label>
                </div>
                <div className="form-check">
                  <input id="paypal" name="paymentMethod" type="radio" className="form-check-input" required
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="paypal">PayPal</label>
                </div>
              </div>

              <div className="row gy-3">
                <div className="col-md-6">
                  <label htmlFor="cc-name" className="form-label">Name on card</label>
                  <input type="text" className="form-control" id="cc-name" placeholder="" required
                    onChange={handleChange}
                  />
                  <small className="text-muted">Full name as displayed on card</small>
                  <div className="invalid-feedback">
                    Name on card is required
                  </div>
                </div>

                <div className="col-md-6">
                  <label htmlFor="cc-number" className="form-label">Credit card number</label>
                  <input type="text" className="form-control" id="cc-number" placeholder="" required
                    onChange={handleChange}
                  />
                  <div className="invalid-feedback">
                    Credit card number is required
                  </div>
                </div>

                <div className="col-md-3">
                  <label htmlFor="cc-expiration" className="form-label">Expiration</label>
                  <input type="text" className="form-control" id="cc-expiration" placeholder="" required
                    onChange={handleChange}
                  />
                  <div className="invalid-feedback">
                    Expiration date required
                  </div>
                </div>

                <div className="col-md-3">
                  <label htmlFor="cc-cvv" className="form-label">CVV</label>
                  <input type="text" className="form-control" id="cc-cvv" placeholder="" required
                    onChange={handleChange}
                  />
                  <div className="invalid-feedback">
                    Security code required
                  </div>
                </div>
              </div>

              <div className="my-5">
                <button className="w-100 btn btn-primary btn-lg">
                  Finalizar Compra!
                </button>
              </div>

            </form>
          </div>
        </div>

      </main>

    </LayoutGeneral>
  )
}

export default CheckoutPage;
