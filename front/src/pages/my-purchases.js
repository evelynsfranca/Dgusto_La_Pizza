
import MyPurchasesList from 'src/components/MyPurchasesList/myPurchasesList';
import LayoutGeneral from '../components/Layout/layoutGeneral';
import style from './MyPurchases.module.css';

function MyPurchases() {
  
  return (
    <LayoutGeneral pageName="MyPurchasesPage">
      <section className={style.pizzaContainer}></section>

      <main className="container my-5">

        <MyPurchasesList />

      </main>

    </LayoutGeneral>
  )
}

export default MyPurchases;