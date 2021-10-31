import LayoutGeneral from '../components/layout/layoutGeneral';
import Menu from '../components/Menu/menu';
import Image from 'next/image';
import pizza from '/public/images/pizza.png';
import style from './MenuPage.module.css';


function MenuPage() {
  return (
    <LayoutGeneral pageName="MenuPage">
      <section className={style.pizzaContainer}>
        <Image src={pizza} width={384} height={221} />
      </section>

      <section className="pt-5 my-5">
        <h2 className="display-5 text-center">
          Tradicionais
        </h2>

        <Menu />

      </section>

    </LayoutGeneral>
  )
}

export default MenuPage;