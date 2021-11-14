
import LayoutGeneral from 'src/components/Layout/layoutGeneral';
// import NewPhoneList from 'src/components/NewPhoneList/NewPhoneList';
import style from './NewPhone.module.css';

function NewPhone({ cartData }) {

  return (
    <LayoutGeneral pageName="NewPhonePage" cartData={cartData}>
      <section className={style.pizzaContainer}></section>

      <main className="container my-5">

        NewPhoneList

      </main>

    </LayoutGeneral>
  )
}

export default NewPhone;