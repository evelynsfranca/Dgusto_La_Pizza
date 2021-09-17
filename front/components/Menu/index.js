import useSWR from 'swr';
import { API_URL } from '../../utils/constants.js';

export const Menu = () => {
  const fetcher = (url) => fetch(url)
      .then(res => res.json())
      .catch(e => console.warn(e))
      
  const { data, error } = useSWR(`${API_URL}/products/flavors`, fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <h2>{data?.content?.filter(it => it.pizzaCategory != null).length > 0 ? data?.content?.filter(it => it.pizzaCategory != null)[0].pizzaCategory : ''}</h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr', maxWidth: '75%', margin: '5% auto', gap: '5%' }}>
        {data?.content?.map(flavor => (
          <div key={flavor.id}>
            <h3>{flavor.name}</h3>
            <hr />
            <p>{flavor.description}</p>
          </div>
        ))}
      </div> 
    </>
  );
}

export default Menu;