import { getPhone, updatePhone } from 'api/client/phone';
import localStorage from 'localStorage';
import { ApiResponse } from 'model/ApiResponse';
import { PhoneType } from 'model/enum/PhoneType';
import { IPhone } from 'model/IPhone';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import Link from 'next/link';
import React, { useEffect, useState } from "react";
import LayoutGeneral from 'src/components/Layout/layoutGeneral';
import { phoneTypes } from 'src/utils/constants';

export default function PhoneUpdate({ cartData }) {
  const router = useRouter();

  const { id } = router.query;
  const token = localStorage.getItem('token');
  
  const [phone, setPhone] = useState<IPhone>({});

  async function handleUpdatePhone() {
    const response = await updatePhone(phone, token);
    response.status === 201 && router.push('/user/my-account')
  }

  async function handleGetPhone() {
    const response: ApiResponse<IPhone> = await getPhone(id.toString(), token);

    response.entity && setPhone(response.entity)
  }
  
  useEffect(() => {
    if (id && token) {
      handleGetPhone();
    }
  }, [id, token]);
  
  return (
    <LayoutGeneral {...cartData}>

      <Head>
        <title>Editando telefone</title>
      </Head>

      <>

        <h1 className="title">
          <Link href="/user/my-account">
            <a title="Voltar para meus dados" className="btn-back">
              &#8249;
            </a>
          </Link>
          {' '}
          Editando telefone
        </h1>

        <div className="row">
          <div className="col">

            <form className="form">

              <div className="mb-3">
                <label>
                  DDD
                </label>
                <input
                  type="text"
                  value={phone.areaCode}
                  className="form-control"
                  onChange={event => setPhone({ ...phone, areaCode: event.target.value })}
                />
              </div>

              <div className="mb-3">
                <label>
                  Número
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={phone.number}
                  onChange={event => setPhone({ ...phone, number: event.target.value })}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <select 
                  id="type" 
                  name="type" 
                  onChange={it => setPhone({...phone, type: PhoneType[it.target.value] })}
                >
                  {Object.values(PhoneType).map((type, index) => (
                    <React.Fragment key={index}>
                      {PhoneType[type] === index && (
                        <option selected={PhoneType[index] === phone.type.toString()} value={PhoneType[type]}>{phoneTypes[PhoneType[index]]}</option>
                      )}
                    </React.Fragment>
                  ))}
                </select>
              </div>
              

          <div className="mb-3 form-check">
            <input
              id="mainPhone" 
              className={`form-check-input`}
              onChange={event => setPhone({ ...phone, mainPhone: event.target.checked ? true : false })}
              type="checkbox" 
              value="" 
              defaultChecked={phone.mainPhone} 
            />
            <label className="form-check-label" htmlFor="mainPhone">
              Telefone principal
            </label>
          </div>

              <button type="button" className="btn btn-secondary" onClick={handleUpdatePhone}>SALVAR</button>

            </form>

          </div>
        </div>

      </>

    </LayoutGeneral>
  );
}