import Image from 'next/image';
import pizza from '/public/images/pizza.png';
import style from './MenuPage.module.css';
import LayoutGeneral from 'src/components/Layout/layoutGeneral';
import Menu from 'src/components/Menu/menu';

function MenuPage({ cartData, setCartData }) {

  return (
    <LayoutGeneral pageName="MenuPage" cartData={cartData}>
      <section className={style.pizzaContainer}>
        <Image src={pizza} width={384} height={221} />
      </section>

      <section className="container pt-5 my-5">

        <Menu cartData={cartData} setCartData={setCartData} />

      </section>

    </LayoutGeneral>
  )
}

export default MenuPage;