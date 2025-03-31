import { yupResolver } from '@hookform/resolvers/yup';
import { getAddress, updateAddress } from 'api/client/address';
import localStorage from 'localStorage';
import { ApiResponse } from 'model/ApiResponse';
import { IAddress } from 'model/IAddress';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import React, { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import LayoutGeneral from 'src/components/Layout/layoutGeneral';
import * as Yup from 'yup';


export default function AddressUpdate({ cartData }) {
  
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

  const { id } = router.query;
  
  async function handleUpdateAddress() {
    const response = await updateAddress(address, token);
    response.status === 201 && router.push('/user/my-account')
  }

  async function handleGetAddress() {
    const response: ApiResponse<IAddress> = await getAddress(id.toString(), token);

    response.entity && setAddress(response.entity)
  }


  useEffect(() => {
    if (id && token) {
      handleGetAddress();
    }
  }, [id, token]);

  return (
    <LayoutGeneral {...cartData}>

      <Head>
        <title>Editando telefone</title>
      </Head>

      <main className="container my-5">

        <form className="form">

          <div className="mb-3 row">
            <label htmlFor="zipCode" className="col-sm-2 col-form-label">CEP: *</label>
            <div className="col-sm-10">
              <input
                id="zipCode"
                type="text"
                value={address.zipCode}
                className={`form-control`}
                onChange={zipCode => setAddress({ ...address, zipCode: zipCode.target.value })}
              />
              <div className="invalid-feedback">{errors.zipCode?.message.toString()}</div>

            </div>
          </div>

          <div className="mb-3 row">
            <label htmlFor="street" className="col-sm-2 col-form-label">Rua: *</label>
            <div className="col-sm-10">
              <input
                id="street"
                type="text"
                value={address.street}
                className={`form-control`}
                onChange={street => setAddress({ ...address, street: street.target.value })}
              />
              <div className="invalid-feedback">{errors.street?.message.toString()}</div>

            </div>
          </div>

          <div className="mb-3 row">
            <label htmlFor="number" className="col-sm-2 col-form-label">Número: *</label>
            <div className="col-sm-10">
              <input
                id="number"
                type="text"
                value={address.number}
                className={`form-control`}
                onChange={number => setAddress({ ...address, number: number.target.value })}
              />
              <div className="invalid-feedback">{errors.number?.message.toString()}</div>

            </div>
          </div>

          <div className="mb-3 row">
            <label htmlFor="complement" className="col-sm-2 col-form-label">Complemento:</label>
            <div className="col-sm-10">
              <input
                id="complement"
                type="text"
                value={address.complement}
                className={`form-control`}
                onChange={complement => setAddress({ ...address, complement: complement.target.value })}
              />
              <div className="invalid-feedback">{errors.complement?.message.toString()}</div>

            </div>
          </div>

          <div className="mb-3 row">
            <label htmlFor="neighborhood" className="col-sm-2 col-form-label">Bairro: *</label>
            <div className="col-sm-10">
              <input
                id="neighborhood"
                type="text"
                value={address.neighborhood}
                className={`form-control`}
                onChange={neighborhood => setAddress({ ...address, neighborhood: neighborhood.target.value })}
              />
              <div className="invalid-feedback">{errors.neighborhood?.message.toString()}</div>

            </div>
          </div>

          <div className="mb-3 row">
            <label htmlFor="city" className="col-sm-2 col-form-label">Cidade: *</label>
            <div className="col-sm-10">
              <input
                id="city"
                type="text"
                value={address.city}
                className={`form-control`}
                onChange={city => setAddress({ ...address, city: city.target.value })}
              />
              <div className="invalid-feedback">{errors.city?.message.toString()}</div>

            </div>
          </div>

          <div className="mb-3 row">
            <label htmlFor="state" className="col-sm-2 col-form-label">Estado: *</label>
            <div className="col-sm-10">
              <input
                id="state"
                type="text"
                value={address.state}
                className={`form-control`}
                onChange={state => setAddress({ ...address, state: state.target.value })} 
              />
              <div className="invalid-feedback">{errors.state?.message.toString()}</div>

            </div>
          </div>

          <div className="mb-3 row">
            <label htmlFor="reference" className="col-sm-2 col-form-label">Referência: *</label>
            <div className="col-sm-10">
              <input
                id="reference"
                type="text"
                value={address.reference}
                className={`form-control`}
                onChange={reference => setAddress({ ...address, reference: reference.target.value })}
                 />
              <div className="invalid-feedback">{errors.reference?.message.toString()}</div>

            </div>
          </div>

          <div className="mb-3 form-check">
            <input
              className={`form-check-input ${errors.mainAddress ? 'is-invalid' : ''}`}
              onChange={mainAddress => setAddress({ ...address, mainAddress: mainAddress.target.checked ? true : false })}
              type="checkbox" value="" id="mainAddress" defaultChecked={address.mainAddress} />
            <label className="form-check-label" htmlFor="mainAddress">
              Endereço principal
            </label>
          </div>

          <div className="d-grid gap-2 mt-5">
            <button className="btn btn-success" type="button" onClick={handleUpdateAddress}>
              Adicionar novo endereço
            </button>
          </div>

        </form>

      </main>
    </LayoutGeneral>
  );
}