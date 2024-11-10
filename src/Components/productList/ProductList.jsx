import ProductItem from "../productItem/ProductItem";
import PropTypes from "prop-types";
import { useState, useEffect, useContext } from "react";
import { ProductContext } from "../services/ProductContext";

const ProductList = () => {
  const [productsList, setProductsList] = useState([]);
  const { isChanged } = useContext(ProductContext);

  useEffect(() => {
    fetch("https://localhost:7016/api/Product/GetAll", {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("user-token")}`,
      },
    })
      .then((response) => response.json())
      .then((products) => {
        setProductsList(products);
        console.log(products);
      })
      .catch((error) => console.log(error));
  }, [isChanged]);

  const productsMapped = productsList.map((product) => (
    <div className="m-3" key={product.id}>
      <ProductItem
        name={product.productName}
        code={product.code}
        img={product.productImage}
      />
    </div>
  ));

  const recentAddedProducts = productsList
    .sort((a, b) => b.id - a.id) // Ordena por ID mayor a menor
    .slice(0, 5) // Toma los primeros 5 productos
    .map((product) => (
      <div className="m-3" key={product.id}>
        <ProductItem
          name={product.productName}
          code={product.code}
          img={product.productImage}
        />
      </div>
    ));

  return (
    <>
      <div className="d-flex justify-content-center flex-column">
        <div className="d-flex flex-wrap">{productsMapped}</div>
        <div className="d-flex flex-wrap">{recentAddedProducts}</div>
      </div>
    </>
  );
};

ProductList.propTypes = {
  products: PropTypes.array,
};

export default ProductList;
