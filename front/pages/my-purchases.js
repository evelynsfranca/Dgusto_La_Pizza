
import LayoutGeneral from '../components/layout/layoutGeneral';
import style from './MyPurchases.module.css';

function MyPurchases() {
  
  return (
    <LayoutGeneral pageName="MyPurchasesPage">
      <section className={style.pizzaContainer}></section>

      <main className="container my-5">

        list of my Purchases

      </main>

    </LayoutGeneral>
  )
}

export default MyPurchases;