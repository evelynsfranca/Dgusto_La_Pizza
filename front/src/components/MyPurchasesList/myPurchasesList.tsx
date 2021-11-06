import useSWR from 'swr';
import { API_URL } from '../../utils/constants';
import CurrencyFormat from 'react-currency-format';
import Loading from '../Loading/loading';
import { useState } from 'react';

export interface IContentPromotions {
  content: IPromotions[];
}

export interface IPromotions {
  id: Number | any;
  name: String;
  description?: String;
  unitValue: Number;
}

export function MyPurchasesList() {
  const [errorMessage, setErrorMessage] = useState(null);

  const fetcher = (url, token = localStorage.getItem('token')) => fetch(url, { headers: { "Authorization": token } })
    .then(res => res.json())
    .catch(e => console.warn(e))

  const { data, error } = useSWR(`${API_URL}/client/requests`, fetcher)

  if (error) return <>failed to load</>
  if (!data) return <Loading />

  if (data.status != 200) return <div className="alert alert-danger" role="alert">Erro ao tentar carregar sua lista de pedidos, tente novamente mais tarde. </div>

  return (
    <>
      <div className="container">
        <div className="row my-5 py-5">

          {data?.content?.map(request => (
            <div key={request.id}>
              <h1>{request.name}</h1>
            </div>
          ))}

        </div>
      </div>
    </>
  );
}

export default MyPurchasesList;