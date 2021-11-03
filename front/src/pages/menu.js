import Menu from '../components/Menu/menu';
import Image from 'next/image';
import pizza from '/public/images/pizza.png';
import style from './MenuPage.module.css';
import LayoutGeneral from '../components/Layout/layoutGeneral';


function MenuPage() {
  return (
    <LayoutGeneral pageName="MenuPage">
      <section className={style.pizzaContainer}>
        <Image src={pizza} width={384} height={221} />
      </section>

      <section className="container pt-5 my-5">
       
        <Menu />

      </section>

    </LayoutGeneral>
  )
}

export default MenuPage;