import useSWR from 'swr'
import { API_URL } from '../../utils/constants'
import CurrencyFormat from 'react-currency-format'
import Loading from '../Loading/loading'
import { ReactElement, useEffect, useState } from 'react'
import Link from 'next/link'
import _, { add } from 'lodash'

export interface IContentPromotions {
  content: IPromotions[]
}

export interface IPromotions {
  id: Number | any
  name: String
  description?: String
  unitValue: Number
}


export const handlerDeleteAddress = (id): any => {
  return (
    console.log('deletado: ' + id)
  )
}

export function UserInfos(data): any {

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

                <Link href="/user/my-account/addresses/new">
                  <a className="btn btn-link mb-3">
                    Novo endereço
                  </a>
                </Link>

                {account?.addresses?.length > 0 &&
                  <div className="row">
                    {account.addresses.map((address, index) => {
                      return (
                        <div className="col" key={index}>
                          <div className="card mb-3">
                            <div className="card-body">

                              {address.street}, {address.number} - {address.neighborhood} - {address.zipCode} <br />
                              {address.city} - {address.state} <br />
                              {address.mainAddress ? <><span className="badge rounded-pill bg-primary">Endereço principal</span> <br /></> : ''}

                              <div className="pt-3">
                                <Link href={"/user/my-account/addresses/edit/" + address.id}>
                                  <a className="btn btn-link ps-0">
                                    <i className="bi bi-pencil"></i>
                                  </a>
                                </Link>

                                <Link href={"/user/my-account/addresses/delete/" + address.id}>
                                  <a className="btn btn-link text-danger">
                                    <i className="bi bi-trash"></i>
                                  </a>
                                </Link>
                              </div>

                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                }

                <hr />

                <h3 className="mb-4">Meus Telefones</h3>

                <Link href="/user/my-account/phones/new">
                  <a className="btn btn-link">
                    Novo endereço
                  </a>
                </Link>

                {account?.phones?.length > 0 &&
                  <p>telefones: {account.phones}</p>
                }

              </div>
            </div>

          </div>

        </div>

      </div>
    ))
  )
}

export function MyAccountData() {
  const [userData, setUserData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isErrored, setIsErrored] = useState('')

  async function getData() {
    setIsLoading(true)

    const res = await fetch(`${API_URL}/client/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem('token')
      }
    })
      .then(res => res.json())
      .catch(e => console.warn(e))

    const response = await res

    if (!!response) {
      setUserData(response)
    } else {
      setIsErrored('Erro ao tentar carregar seus dados, tente novamente mais tarde.');
    }

    setIsLoading(false)

  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <div className="container">
        <div className="row">

          {!isLoading && isErrored &&
            <>
              <div className="alert alert-danger" role="alert">
                Erro ao tentar carregar seus dados, tente novamente mais tarde.
              </div>
            </>
          }

          {!isLoading && !!userData && <UserInfos data={userData} />}

        </div>
      </div>
    </>
  )
}

export default MyAccountData