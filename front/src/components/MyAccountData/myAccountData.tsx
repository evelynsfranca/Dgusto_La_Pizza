import useSWR from 'swr'
import { API_URL } from '../../utils/constants'
import CurrencyFormat from 'react-currency-format'
import Loading from '../Loading/loading'
import { ReactElement, useEffect, useState } from 'react'
import Link from 'next/link'
import _ from 'lodash'

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

                {account?.addresses?.length === 0 &&
                  <Link href="/user/my-account/new-address">
                    <a className="btn btn-link">
                      Novo endereço
                    </a>
                  </Link>
                }

                {account?.addresses?.length > 0 &&
                  <p>endereços: {account.addresses}</p>
                }

                <hr />

                <h3 className="mb-4">Meu Telefones</h3>

                {account?.phones?.length === 0 &&
                  <Link href="/user/my-account/new-phone">
                    <a className="btn btn-link">
                      Novo endereço
                    </a>
                  </Link>
                }

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


  // const fetcher = (url, token = localStorage.getItem('token')) => fetch(url, { headers: { "Authorization": token } })
  //   .then(res => res.json())
  //   .catch(e => console.warn(e))

  // const { data, error } = useSWR(`${API_URL}/client/me`, fetcher)

  // if (error) return <>failed to load</>
  // if (!data) return <Loading />

  // if (!data?.cpf) {
  //   let message: ReactElement
  //   message = <div className="alert alert-danger" role="alert">Erro ao tentar carregar seus dados, tente novamente mais tarde.</div>
  //   return message
  // }

  // setUserData(data)

  return (
    <>
      <div className="container">
        <div className="row my-5 py-5">

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