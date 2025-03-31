import { deleteAddress } from 'api/client/address';
import { getClient } from 'api/client/client';
import { deletePhone } from 'api/client/phone';
import _ from 'lodash';
import { IClient } from 'model/IClient';
import Link from 'next/link';
import router from 'next/router';
import { useEffect, useState } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import { phoneTypes } from '../../utils/constants';
import localStorage from 'localStorage';

export interface IContentPromotions {
  content: IPromotions[]
}

export interface IPromotions {
  id: Number | any
  name: String
  description?: String
  unitValue: Number
}

export const UserInfos = (data): any => {

  const token = localStorage?.getItem('token');

  const [showDeleteAddressModal, setShowDeleteAddressModal] = useState(false);
  const [showDeletePhoneModal, setShowDeletePhoneModal] = useState(false);
  const [addressToDeleteModal, setAddressToDeleteModal] = useState('');
  const [phoneToDeleteModal, setPhoneToDeleteModal] = useState('');
  const [loading, setLoading] = useState<boolean>(false);

  function openModalDeleteAddress(id) {
    setAddressToDeleteModal(id)
    setShowDeleteAddressModal(true)
  }

  function openModalDeletePhone(id) {
    setPhoneToDeleteModal(id)
    setShowDeletePhoneModal(true)
  }

  async function confirmAddressDelete() {
    const response = await deleteAddress(addressToDeleteModal, token);

    if (response.status) {
      setShowDeleteAddressModal(false)
      location.reload();
    }
  }

  async function confirmPhoneDelete() {
    const response = await deletePhone(phoneToDeleteModal, token);

    if (response.status) {
      setShowDeletePhoneModal(false)
      location.reload();
    }
  }

  return (
    _.map(data, account => (

      <div key={account.id}>
        <div className="row">
          <div className="col">

            <div className="card mb-3">
              <div className="card-body">
                <h3 className="mb-4">Meu Dados</h3>

                <div className="mb-2 row">
                  <label htmlFor="cpf" className="col-sm-2 form-label">CPF:</label>
                  <div className="col-sm-10">
                    {account?.cpf}
                  </div>
                </div>

                <div className="mb-2 row">
                  <label htmlFor="name" className="col-sm-2 form-label">Nome:</label>
                  <div className="col-sm-10">
                    {account?.user?.name}
                  </div>
                </div>

                <div className="mb-2 row">
                  <label htmlFor="email" className="col-sm-2 form-label">Email:</label>
                  <div className="col-sm-10">
                    {account?.user?.email}
                  </div>
                </div>

                <hr />

                <h3 className="mb-4">Meus Endereços</h3>

                <Link
                  href="/user/my-account/new-address"
                  className="btn btn-link mb-3"
                >
                  <span>Novo endereço</span>
                </Link>

                {account?.addresses?.length > 0 &&

                  <div className="row">
                    {account.addresses
                      .map((address, index) => {
                        return (
                          <div className="col">
                            <div className="card mb-3">
                              <div className="card-body">

                                {address.street}, {address.number} - {address.neighborhood} - {address.zipCode} <br />
                                {address.city} - {address.state} <br /><br />
                                {address.mainAddress
                                  ? <span className="badge rounded-pill bg-primary">Endereço principal</span>
                                  : ''}

                                <button
                                  type="button"
                                  className="badge rounded-pill bg-primary" style={{ border: 0 }}
                                  onClick={() => router.push(`/user/my-account/edit-address/${address.id}`)}
                                >
                                  Editar
                                </button>

                                <button
                                  type="button"
                                  className="badge rounded-pill bg-danger"
                                  style={{ border: 0 }}
                                  onClick={() => openModalDeleteAddress(address.id)}
                                >
                                  Remover
                                </button>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                  </div>
                }

                <hr />

                <h3 className="mb-4">Meus Telefones</h3>

                <Link
                  href="/user/my-account/new-phone"
                  className="btn btn-link"
                >
                  <span>Novo telefone</span>
                </Link>

                {account?.phones?.length > 0 && (

                  <>
                    <p>telefones:</p>
                    {account.phones
                      .map((phone, index) => (
                        <>
                          <div>{`(${phone.areaCode}) ${phone.number}`}</div>
                          <div>{`${phoneTypes[phone.type] ?? ''}`}</div>
                          {phone.mainPhone
                            ? <span className="badge rounded-pill bg-primary">Telefone principal</span>
                            : ''}

                          <button
                            type="button"
                            className="badge rounded-pill bg-primary"
                            style={{ border: 0 }}
                            onClick={() => router.push(`/user/my-account/edit-phone/${phone.id}`)}
                          >
                            Editar
                          </button>
                          <button
                            type="button"
                            className="badge rounded-pill bg-danger"
                            style={{ border: 0 }}
                            onClick={() => openModalDeletePhone(phone.id)}
                          >
                            Remover
                          </button>
                        </>
                      ))}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <SweetAlert
          show={showDeleteAddressModal}
          warning
          showCancel
          cancelBtnText="Cancelar"
          confirmBtnText="Deletar"
          confirmBtnBsStyle="danger"
          title="Deseja mesmo deletar?"
          placeholder='Ao confirmar, você irá deletar o endereço, esta ação não poderá ser revertida.'
          onConfirm={() => confirmAddressDelete()}
          onCancel={() => setShowDeleteAddressModal(false)}
          focusCancelBtn
        />
        {/* Ao confirmar, você irá deletar o endereço, esta ação não poderá ser revertida.
        </SweetAlert> */}

        <SweetAlert
          show={showDeletePhoneModal}
          warning
          showCancel
          cancelBtnText="Cancelar"
          confirmBtnText="Deletar"
          confirmBtnBsStyle="danger"
          title="Deseja mesmo deletar? Ao confirmar, você irá deletar o telefone, esta ação não poderá ser revertida."
          onConfirm={() => confirmPhoneDelete()}
          onCancel={() => setShowDeletePhoneModal(false)}
          focusCancelBtn
          placeholder='Ao confirmar, você irá deletar o telefone, esta ação não poderá ser revertida.'
        />
        {/* Ao confirmar, você irá deletar o telefone, esta ação não poderá ser revertida.
        </SweetAlert> */}
      </div>
    ))
  )
}

export function MyAccountData() {

  const token = localStorage.getItem('token');
  const [userData, setUserData] = useState<IClient>({})
  const [isLoading, setIsLoading] = useState(false)
  const [isErrored, setIsErrored] = useState('')

  async function getData() {
    setIsLoading(true)

    const response = await getClient(token)

    if (response.entity) {
      setUserData(response.entity)
    } else {
      setIsErrored('Erro ao tentar carregar seus dados, tente novamente mais tarde.');
    }

    setIsLoading(false)
  }

  useEffect(() => { getData() }, []);

  return (
    <div className="container">
      <div className="row">

        {!isLoading && isErrored &&
          <div className="alert alert-danger" role="alert">
            Erro ao tentar carregar seus dados, tente novamente mais tarde.
          </div>
        }

        {!isLoading && !!userData &&
          <UserInfos data={userData} />
        }

      </div>
    </div>
  )
}

export default MyAccountData;