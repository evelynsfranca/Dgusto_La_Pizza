import LayoutGeneral from "src/components/Layout/layoutGeneral";

function IndexPage({ cartData }) {
  return (
    <LayoutGeneral pageName="HomePage" cartData={cartData}>

    </LayoutGeneral>
  )
}

export default IndexPage;