import LayoutGeneral from "src/components/Layout/layoutGeneral";

function MyAccountPage({ cartData }) {
  return (
    <LayoutGeneral pageName="MyAccountPage" cartData={cartData}>

      <main className="container">
        my account

      </main>

    </LayoutGeneral>
  )
}

export default MyAccountPage;