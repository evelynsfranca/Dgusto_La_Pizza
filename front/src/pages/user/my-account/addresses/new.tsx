
import { yupResolver } from '@hookform/resolvers/yup';
import { saveAddress } from 'api/client/address';
import localStorage from 'localStorage';
import { IAddress } from 'model/IAddress';
import { useRouter } from 'next/router';
import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import LayoutGeneral from 'src/components/Layout/layoutGeneral';
import * as Yup from 'yup';
import style from './NewAddress.module.css';

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


  const router = useRouter();
  const token = localStorage.getItem('token');
  const [address, setAddress] = useState<IAddress>({})

  async function handleSaveAddress() {
    const response = await saveAddress(address, token)
    
    if (response.status === 201) {
      router.push('/user/my-account')
    }
  }

  return (
    <LayoutGeneral pageName="NewAddressPage" cartData={cartData}>
      <section className={style.pizzaContainer}></section>

      <main className="container my-5">

        <form className="form" onSubmit={handleSubmit(handleSaveAddress)}>

          <div className="mb-3 row">
            <label htmlFor="zipCode" className="col-sm-2 col-form-label">CEP: *</label>
            <div className="col-sm-10">
              <input
                id="zipCode"
                type="text"
                {...register('zipCode')}
                className={`form-control ${errors.zipCode ? 'is-invalid' : ''}`}
                onChange={zipCode => setAddress({ ...address, zipCode: zipCode.target.value })}
              />
              <div className="invalid-feedback">{errors.zipCode?.message}</div>

            </div>
          </div>

          <div className="mb-3 row">
            <label htmlFor="street" className="col-sm-2 col-form-label">Rua: *</label>
            <div className="col-sm-10">
              <input
                id="street"
                type="text"
                {...register('street')}
                className={`form-control ${errors.street ? 'is-invalid' : ''}`}
                onChange={street => setAddress({ ...address, street: street.target.value })}
              />
              <div className="invalid-feedback">{errors.street?.message}</div>

            </div>
          </div>

          <div className="mb-3 row">
            <label htmlFor="number" className="col-sm-2 col-form-label">Número: *</label>
            <div className="col-sm-10">
              <input
                id="number"
                type="text"
                {...register('number')}
                className={`form-control ${errors.number ? 'is-invalid' : ''}`}
                onChange={number => setAddress({ ...address, number: number.target.value })}
              />
              <div className="invalid-feedback">{errors.number?.message}</div>

            </div>
          </div>

          <div className="mb-3 row">
            <label htmlFor="complement" className="col-sm-2 col-form-label">Complemento:</label>
            <div className="col-sm-10">
              <input
                id="complement"
                type="text"
                {...register('complement')}
                className={`form-control ${errors.complement ? 'is-invalid' : ''}`}
                onChange={complement => setAddress({ ...address, complement: complement.target.value })}
              />
              <div className="invalid-feedback">{errors.complement?.message}</div>

            </div>
          </div>

          <div className="mb-3 row">
            <label htmlFor="neighborhood" className="col-sm-2 col-form-label">Bairro: *</label>
            <div className="col-sm-10">
              <input
                id="neighborhood"
                type="text"
                {...register('neighborhood')}
                className={`form-control ${errors.neighborhood ? 'is-invalid' : ''}`}
                onChange={neighborhood => setAddress({ ...address, neighborhood: neighborhood.target.value })}
              />
              <div className="invalid-feedback">{errors.neighborhood?.message}</div>

            </div>
          </div>

          <div className="mb-3 row">
            <label htmlFor="city" className="col-sm-2 col-form-label">Cidade: *</label>
            <div className="col-sm-10">
              <input
                id="city"
                type="text"
                {...register('city')}
                className={`form-control ${errors.city ? 'is-invalid' : ''}`}
                onChange={city => setAddress({ ...address, city: city.target.value })}
              />
              <div className="invalid-feedback">{errors.city?.message}</div>

            </div>
          </div>

          <div className="mb-3 row">
            <label htmlFor="state" className="col-sm-2 col-form-label">Estado: *</label>
            <div className="col-sm-10">
              <input
                id="state"
                type="text"
                {...register('state')}
                className={`form-control ${errors.state ? 'is-invalid' : ''}`}
                onChange={state => setAddress({ ...address, state: state.target.value })} 
              />
              <div className="invalid-feedback">{errors.state?.message}</div>

            </div>
          </div>

          <div className="mb-3 row">
            <label htmlFor="reference" className="col-sm-2 col-form-label">Referência: *</label>
            <div className="col-sm-10">
              <input
                id="reference"
                type="text"
                {...register('reference')}
                className={`form-control ${errors.reference ? 'is-invalid' : ''}`}
                onChange={reference => setAddress({ ...address, reference: reference.target.value })}
                 />
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
              {...register('mainAddress')}
              onChange={mainAddress => setAddress({ ...address, mainAddress: !!mainAddress.target.value })}
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