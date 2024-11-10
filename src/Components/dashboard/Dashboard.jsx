import PropTypes from "prop-types";

import ProductList from "../productList/ProductList";

  const Dashboard = ({products}) => {

    return(
        <>
          <div className="custom-bg">
            <div className="d-flex justify-content-center">
            <h2 className="mt-5 mb-3 text-info">Bienvenido al sistema de piezas de PARKE SRL</h2>
            </div>
            <div className="d-flex justify-content-center flex-row m-3">
            <ProductList products={products}/>
            </div>
          </div>
        </>
    )
  }

  Dashboard.propTypes = {
    products: PropTypes.array
  };

  export default Dashboard;