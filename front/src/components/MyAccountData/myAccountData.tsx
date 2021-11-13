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
        <h1>cpf: {account.cpf}</h1>
        <h1>nome: {account.user.name}</h1>
        <h1>email: {account.user.email}</h1>
        <h1>telefones: {account.phones}</h1>
        <h1>endereços: {account.addresses}</h1>
      </div>
    ))
  )
}

export function MyAccountData() {
  const [userData, setUserData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isErrored, setIsErrored] = useState('')

  const getData = async () => {
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

    if (response) {
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