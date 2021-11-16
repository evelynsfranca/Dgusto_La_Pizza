import { API_URL } from '../../utils/constants'
import { useEffect, useState } from 'react'
import _ from 'lodash'
import { UserInfos } from '../UserInfos/userInfos'

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

          {!isLoading && !!userData &&
            <UserInfos data={userData} />
          }

        </div>
      </div>
    </>
  )
}

export default MyAccountData