
import React, { useEffect, useState } from "react"
import { useForm } from 'react-hook-form'
import localStorage from 'localStorage'
import Link from 'next/link';

import LayoutGeneral from 'src/components/Layout/layoutGeneral'
import style from './EditAddressPage.module.css'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { API_URL } from "src/utils/constants"
import { useRouter } from "next/router"

export interface IAddresses {
  id?: number
  zipCode: string
  street: string
  number: string
  complement: string
  neighborhood: string
  city: string
  state: string
  country: string
  reference: string
  mainAddress: boolean
}

function EditAddressPage({ cartData }) {
  const router = useRouter()
  const { id } = router.query

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
  const [isLoading, setIsLoading] = useState(false)
  const [isErrored, setIsErrored] = useState('')

  const [address, setAddress] = useState<IAddresses>({
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
    setIsLoading(true)

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

    if (response?.status) {
      setIsLoading(false)
    }

    if (response?.id) {
      router.push('/user/my-account')
    }
  }

  async function getAddressData(id) {
    setIsLoading(true)

    const res = await fetch(`${API_URL}/client/addresses/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem('token')
      }
    })
      .then(res => res.json())
      .catch(e => console.warn(e))

    const response = await res

    response && setAddress(response)

    // if (!!response) {
    //   setAddress(response)
    // } else {
    //   setIsErrored('Erro ao tentar carregar seus dados, tente novamente mais tarde.')
    // }

    setIsLoading(false)
  }

  useEffect(() => {
    getAddressData(id);
  }, []);

  return (
    <LayoutGeneral pageName="EditAddressPagePage" cartData={cartData}>
      <section className={style.pizzaContainer}></section>

      <main className="container my-5">

        <form className="form" onSubmit={handleSubmit(handleAddress)}>

          <div className="mb-3 row">
            <label htmlFor="zipCode" className="col-sm-2 col-form-label">CEP: *</label>
            <div className="col-sm-10">
              <input
                type="text"
                className={`form-control ${errors.zipCode ? 'is-invalid' : ''}`}
                {...register('zipCode')}
                onChange={zipCode => setAddress({ ...address, zipCode: zipCode.target.value })}
                id="zipCode"
                value={address.zipCode}
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
                {...register('street')}
                onChange={street => setAddress({ ...address, street: street.target.value })}
                value={address.street}
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
                {...register('number')}
                onChange={number => setAddress({ ...address, number: number.target.value })}
                value={address.number}
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
                {...register('complement')}
                onChange={complement => setAddress({ ...address, complement: complement.target.value })}
                value={address.complement}
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
                {...register('neighborhood')}
                onChange={neighborhood => setAddress({ ...address, neighborhood: neighborhood.target.value })}
                value={address.neighborhood}
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
                {...register('city')}
                onChange={city => setAddress({ ...address, city: city.target.value })}
                value={address.city}
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
                {...register('state')}
                onChange={state => setAddress({ ...address, state: state.target.value })}
                value={address.state}
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
                {...register('reference')}
                onChange={reference => setAddress({ ...address, reference: reference.target.value })}
                value={address.reference}
                id="reference" />
              <div className="invalid-feedback">{errors.reference?.message}</div>

            </div>
          </div>

          <div className="mb-3 form-check">
            <input
              className={`form-check-input ${errors.mainAddress ? 'is-invalid' : ''}`}
              {...register('mainAddress')}
              onChange={mainAddress => setAddress({ ...address, mainAddress: !!mainAddress.target.value })}
              type="checkbox"
              id="mainAddress"
              defaultChecked={address.mainAddress}
              checked={address.mainAddress}
            />
            <label className="form-check-label" htmlFor="mainAddress">
              Endereço principal
            </label>
          </div>

          <div className="row">
            <div className="col-xs-12 col-sm-6">
              <Link href="/user/my-account">
              <a className="btn btn-link w-100">
                Voltar
              </a>
              </Link>
            </div>
            <div className="col-xs-12 col-sm-6">
              <button className="btn btn-success w-100" type="submit" disabled={isLoading}>
                {!isLoading &&
                  <>
                    Alterar Endereço
                  </>
                }
                {isLoading &&
                  <>
                    Carregando...
                  </>
                }
              </button>
            </div>
          </div>

        </form>

      </main>

    </LayoutGeneral>
  )
}

export default EditAddressPage