
import LayoutGeneral from 'src/components/Layout/layoutGeneral';
// import NewAddressList from 'src/components/NewAddressList/NewAddressList';
import style from './NewAddress.module.css';

function NewAddress({ cartData }) {

  return (
    <LayoutGeneral pageName="NewAddressPage" cartData={cartData}>
      <section className={style.pizzaContainer}></section>

      <main className="container my-5">

        NewAddressList

      </main>

    </LayoutGeneral>
  )
}

export default NewAddress;