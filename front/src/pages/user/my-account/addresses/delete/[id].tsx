import router, { useRouter } from 'next/router';
import useSWR from 'swr';
import { API_URL } from 'src/utils/constants';
import LayoutGeneral from 'src/components/Layout/layoutGeneral';

function ApiAddressDelete(params) {
  const fetcher = (url, token = localStorage.getItem('token')) => fetch(url, {
    method: "DELETE",
    headers: {
      "Authorization": token
    }
  })
    .then(res => res.json())
    .catch(e => console.warn(e))

  const { data, error } = useSWR([`${API_URL}/client/addresses/${params.id}`], fetcher)

  if (error || data?.status === 500) return <div>failed to load</div>
  if (!data) return <div></div>

  if(data.length === undefined || data.status === 404) {
    router.push('/user/my-account')
  }

  return (<>carregando...</>)
}

function AddressDelete({ cartData }) {
  const router = useRouter();
  const { id } = router.query;
  
  return (
    <LayoutGeneral
      pageName="AddressDeletePage"
      cartData={cartData}
    >

      <div className="container">

        <ApiAddressDelete id={id} />

      </div>
    </LayoutGeneral>

  );
}

export default AddressDelete