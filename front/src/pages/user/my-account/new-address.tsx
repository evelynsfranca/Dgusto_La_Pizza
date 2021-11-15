
import React, { useEffect, useState } from "react"
import { useForm } from 'react-hook-form'
import localStorage from 'localStorage';

import LayoutGeneral from 'src/components/Layout/layoutGeneral'
import style from './NewAddress.module.css'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { API_URL } from "src/utils/constants"

function NewAddress({ cartData }) {

  const validationSchema = Yup.object().shape({
    zipCode: Yup.string()
      .required('Este campo é obrigatório.'),
    street: Yup.string()
      .required('Este campo é obrigatório.'),
    number: Yup.string()
      .required('Este campo é obrigatório.'),
    complement: Yup.string()
      .notRequired(),
    neighborhood: Yup.string()
      .required('Este campo é obrigatório.'),
    city: Yup.string()
      .required('Este campo é obrigatório.'),
    state: Yup.string()
      .required('Este campo é obrigatório.'),
    country: Yup.string()
      .notRequired(),
    reference: Yup.string()
      .required('Este campo é obrigatório.')
  })

  const formOptions = { resolver: yupResolver(validationSchema) }
  const { register, handleSubmit, formState } = useForm(formOptions)
  const { errors } = formState
  const [token, setToken] = useState(localStorage.getItem('token'))

  const [address, setAddress] = useState({
    zipCode: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    country: 'Brasil',
    reference: '',
    mainAddress: true,
  })

  async function handleAddress() {
    const res = await fetch(`${API_URL}/client/addresses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
      body: JSON.stringify(address)
    })
      .then(res => res.json())
      .catch(e => console.warn(e))

    const response = await res

    console.log(response)
    if (response) {
      console.log('savo')
      //router.push('/admin/products/list')
    }
  }

  return (
    <LayoutGeneral pageName="NewAddressPage" cartData={cartData}>
      <section className={style.pizzaContainer}></section>

      <main className="container my-5">

        <form className="form" onSubmit={handleSubmit(handleAddress)}>

          <div className="mb-3 row">
            <label htmlFor="zipCode" className="col-sm-2 col-form-label">CEP: *</label>
            <div className="col-sm-10">
              <input
                type="text"
                className={`form-control ${errors.zipCode ? 'is-invalid' : ''}`}
                onChange={zipCode => setAddress({ ...address, zipCode: zipCode.target.value })}
                {...register('zipCode')}
                id="zipCode"
              />
              <div className="invalid-feedback">{errors.zipCode?.message}</div>

            </div>
          </div>

          <div className="mb-3 row">
            <label htmlFor="street" className="col-sm-2 col-form-label">Rua: *</label>
            <div className="col-sm-10">
              <input
                type="text"
                className={`form-control ${errors.street ? 'is-invalid' : ''}`}
                onChange={street => setAddress({ ...address, street: street.target.value })}
                {...register('street')}
                id="street" />
              <div className="invalid-feedback">{errors.street?.message}</div>

            </div>
          </div>

          <div className="mb-3 row">
            <label htmlFor="number" className="col-sm-2 col-form-label">Número: *</label>
            <div className="col-sm-10">
              <input
                type="text"
                className={`form-control ${errors.number ? 'is-invalid' : ''}`}
                onChange={number => setAddress({ ...address, number: number.target.value })}
                {...register('number')}
                id="number" />
              <div className="invalid-feedback">{errors.number?.message}</div>

            </div>
          </div>

          <div className="mb-3 row">
            <label htmlFor="complement" className="col-sm-2 col-form-label">Complemento:</label>
            <div className="col-sm-10">
              <input
                type="text"
                className={`form-control ${errors.complement ? 'is-invalid' : ''}`}
                onChange={complement => setAddress({ ...address, complement: complement.target.value })}
                {...register('complement')}
                id="complement" />
              <div className="invalid-feedback">{errors.complement?.message}</div>

            </div>
          </div>

          <div className="mb-3 row">
            <label htmlFor="neighborhood" className="col-sm-2 col-form-label">Bairro: *</label>
            <div className="col-sm-10">
              <input
                type="text"
                className={`form-control ${errors.neighborhood ? 'is-invalid' : ''}`}
                onChange={neighborhood => setAddress({ ...address, neighborhood: neighborhood.target.value })}
                {...register('neighborhood')}
                id="neighborhood" />
              <div className="invalid-feedback">{errors.neighborhood?.message}</div>

            </div>
          </div>

          <div className="mb-3 row">
            <label htmlFor="city" className="col-sm-2 col-form-label">Cidade: *</label>
            <div className="col-sm-10">
              <input
                type="text"
                className={`form-control ${errors.city ? 'is-invalid' : ''}`}
                onChange={city => setAddress({ ...address, city: city.target.value })}
                {...register('city')}
                id="city" />
              <div className="invalid-feedback">{errors.city?.message}</div>

            </div>
          </div>

          <div className="mb-3 row">
            <label htmlFor="state" className="col-sm-2 col-form-label">Estado: *</label>
            <div className="col-sm-10">
              <input
                type="text"
                className={`form-control ${errors.state ? 'is-invalid' : ''}`}
                onChange={state => setAddress({ ...address, state: state.target.value })}
                {...register('state')}
                id="state" />
              <div className="invalid-feedback">{errors.state?.message}</div>

            </div>
          </div>

          <div className="mb-3 row">
            <label htmlFor="reference" className="col-sm-2 col-form-label">Referência: *</label>
            <div className="col-sm-10">
              <input
                type="text"
                className={`form-control ${errors.reference ? 'is-invalid' : ''}`}
                onChange={reference => setAddress({ ...address, reference: reference.target.value })}
                {...register('reference')}
                id="reference" />
              <div className="invalid-feedback">{errors.reference?.message}</div>

            </div>
          </div>

          {/* <div className="mb-3 row">
            <label htmlFor="country" className="col-sm-2 col-form-label">País</label>
            <div className="col-sm-10">
              <input 
              type="text" 
              className={`form-control ${errors.country ? 'is-invalid' : ''}`}
                onChange={country => setAddress({ ...address, country: country.target.value })}
                {...register('country')}
                 id="country" />
            </div>
          </div> */}

          <div className="mb-3 form-check">
            <input
              className={`form-check-input ${errors.mainAddress ? 'is-invalid' : ''}`}
              onChange={mainAddress => setAddress({ ...address, mainAddress: !!mainAddress.target.value })}
              {...register('mainAddress')}
              type="checkbox" value="" id="mainAddress" defaultChecked={address.mainAddress} />
            <label className="form-check-label" htmlFor="mainAddress">
              Endereço principal
            </label>
          </div>

          <div className="d-grid gap-2 mt-5">
            <button className="btn btn-success" type="submit">
              Adicionar novo endereço
            </button>
          </div>

        </form>

      </main>

    </LayoutGeneral>
  )
}

export default NewAddress