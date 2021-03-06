import LayoutGeneral from 'src/components/Layout/layoutGeneral';
import PromotionsList from 'src/components/PromotionsList/promotionsList';
import style from './Promotions.module.css';

function PromotionsPage({ cartData }) {
  return (
    <LayoutGeneral pageName="PromotionsPage" cartData={cartData}>
      <section className={style.pizzaContainer}></section>

      <main className="container my-5">

        <PromotionsList />

      </main>

    </LayoutGeneral>
  )
}

export default PromotionsPage;