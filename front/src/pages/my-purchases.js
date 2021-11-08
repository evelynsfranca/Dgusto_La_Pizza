
import MyPurchasesList from 'src/components/MyPurchasesList/myPurchasesList';
import LayoutGeneral from '../components/Layout/layoutGeneral';
import style from './MyPurchases.module.css';

function MyPurchases({ cartData }) {

  return (
    <LayoutGeneral pageName="MyPurchasesPage" cartData={cartData}>
      <section className={style.pizzaContainer}></section>

      <main className="container my-5">

        <MyPurchasesList />

      </main>

    </LayoutGeneral>
  )
}

export default MyPurchases;