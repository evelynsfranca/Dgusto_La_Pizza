
import { yupResolver } from '@hookform/resolvers/yup';
import { savePhone } from 'api/client/phone';
import localStorage from 'localStorage';
import { PhoneType } from 'model/enum/PhoneType';
import { IPhone } from 'model/IPhone';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import LayoutGeneral from 'src/components/Layout/layoutGeneral';
import { phoneTypes } from 'src/utils/constants';
import * as Yup from 'yup';
import style from './NewPhone.module.css';

function NewPhone({ cartData }) {
  
  const validationSchema = Yup.object().shape({
    areaCode: Yup.string()
      .required('Este campo é obrigatório.'),
    number: Yup.string()
      .required('Este campo é obrigatório.'),
    type: Yup.string()
      .required('Este campo é obrigatório.'),
    mainPhone: Yup.string()
      .notRequired()
  })

  const formOptions = { resolver: yupResolver(validationSchema) }
  const { register, handleSubmit, formState } = useForm(formOptions)
  const { errors } = formState

  const router = useRouter();
  const token = localStorage.getItem('token');
  const [phone, setPhone] = useState<IPhone>({})

  async function handleSavePhone() {
    const response = await savePhone(phone, token)
    
    if (response.status === 201) {
      router.push('/user/my-account')
    }
  }
  return (
    <LayoutGeneral pageName="NewPhonePage" cartData={cartData}>
      <section className={style.pizzaContainer}></section>

      <main className="container my-5">

        <form className="form">

          <div className="mb-3 row">
            <label htmlFor="areaCode" className="col-sm-2 col-form-label">DDD: </label>
            <div className="col-sm-10">
              <input
                id="areaCode"
                type="text"
                {...register('areaCode')}
                className={`form-control ${errors.areaCode ? 'is-invalid' : ''}`}
                onChange={event => setPhone({ ...phone, areaCode: event.target.value })}
              />
              <div className="invalid-feedback">{errors.areaCode?.message}</div>

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
                onChange={event => setPhone({ ...phone, number: event.target.value })}
              />
              <div className="invalid-feedback">{errors.number?.message}</div>

            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <select 
              id="type" 
              name="type" 
              onChange={it => setPhone({...phone, type: PhoneType[it.target.value] })}>
              {Object.values(PhoneType).map((type, index) => (
                <React.Fragment key={index}>
                  {PhoneType[type] === index && (
                    <option selected={(PhoneType[index] === phone.type?.toString()) ?? index == 0} value={PhoneType[type]}>{phoneTypes[PhoneType[index]]}</option>
                  )}
                </React.Fragment>
              ))}
            </select>
         </div>

          <div className="mb-3 form-check">
            <input
              id="mainPhone" 
              {...register('mainPhone')}
              className={`form-check-input ${errors.mainPhone ? 'is-invalid' : ''}`}
              onChange={event => setPhone({ ...phone, mainPhone: event.target.checked ? true : false })}
              type="checkbox" 
              value="" 
              defaultChecked={phone.mainPhone} 
            />
            <label className="form-check-label" htmlFor="mainPhone">
              Telefone principal
            </label>
          </div>

          <div className="d-grid gap-2 mt-5">
            <button className="btn btn-success" type="button" onClick={handleSavePhone}>
              Adicionar novo telefone
            </button>
          </div>

        </form>

      </main>

    </LayoutGeneral>
  )
}

export default NewPhone;