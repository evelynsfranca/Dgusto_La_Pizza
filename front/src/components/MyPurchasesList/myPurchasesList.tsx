import useSWR from 'swr';
import { API_URL } from '../../utils/constants';
import CurrencyFormat from 'react-currency-format';
import Loading from '../Loading/loading';
import { ReactElement, useState } from 'react';
import Link from 'next/link';

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
  
  const fetcher = (url, token = localStorage.getItem('token')) => fetch(url, { headers: { "Authorization": token } })
    .then(res => res.json())
    .catch(e => console.warn(e))

  const { data, error } = useSWR(`${API_URL}/client/requests`, fetcher)

  if (error || data?.status === 500) return <>failed to load</>
  if (!data) return <Loading />

  if (data.status != 200) {
    let message:ReactElement;
    
    if(data?.content?.length == 0) {
      message = <>
        <h3 className="mb-4">Ops, parece que você não fez nenhum pedido ainda.</h3>
        Acesse o nosso 
        {' '}
        <Link href="/menu">
          <a>
          menu
          </a>
        </Link>
        {' '}
        e peça sua pizza!
      </>
    } else {
      message = <div className="alert alert-danger" role="alert">Erro ao tentar carregar sua lista de pedidos, tente novamente mais tarde. </div>
    }

    return message;
  }

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