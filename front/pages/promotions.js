import LayoutGeneral from '../components/layout/layoutGeneral';
import PromotionsList from '../components/PromotionsList/promotionsList';
import style from './Promotions.module.css';

function PromotionsPage() {
  return (
    <LayoutGeneral pageName="PromotionsPage">
      <section className={style.pizzaContainer}></section>

      <main className="container my-5">

        <PromotionsList/>

      </main>

    </LayoutGeneral>
  )
}

export default PromotionsPage;