import LayoutGeneral from "src/components/Layout/layoutGeneral";
import MyAccountData from "src/components/MyAccountData/myAccountData";
import style from './MyAccount.module.css';

function MyAccountPage({ cartData }) {
  return (
    <LayoutGeneral pageName="MyAccountPage" cartData={cartData}>
      <section className={style.pizzaContainer}></section>

      <main className="container my-5">

      <MyAccountData />

      </main>

    </LayoutGeneral>
  )
}

export default MyAccountPage;