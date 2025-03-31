import useSWR from 'swr';
import { API_URL } from 'src/utils/constants';
import Loading from '../Loading/loading';
import { NumberFormatBase } from 'react-number-format';

export interface IContentPromotions {
  content: IPromotions[];
}

export interface IPromotions {
  id: Number | any;
  name: String;
  description?: String;
  unitValue: Number;
}

export function PromotionsList() {

  const fetcher = (url, token = localStorage.getItem('token')) => fetch(url, { headers: { "Authorization": token } })
    .then(res => res.json())
    .catch(e => console.warn(e))

  const { data, error } = useSWR(`${API_URL}/products/types/promocao`, fetcher)

  if (error || data?.status === 500) return <>failed to load</>
  if (!data) return <Loading />

  return (
    <>
      <div className="container">
        <div className="row my-5 py-5">

          {data?.content?.map(promotion => (
            <div key={promotion.id}>
              <h1>{promotion.name}</h1>
              <NumberFormatBase
                format={(numStr) => {
                  if (numStr === '') return '';
                  return new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                    maximumFractionDigits: 2,
                  }).format(Number(numStr))
                }}
                value={promotion.unitValue}
                displayType={'text'}
                prefix={'R$ '}
                renderText={value => <p>{value}</p>}
              />
            </div>
          ))}

        </div>
      </div>
    </>
  );
}

export default PromotionsList;