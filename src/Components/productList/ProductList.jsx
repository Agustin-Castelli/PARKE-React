import ProductItem from "../productItem/ProductItem";  
import PropTypes from "prop-types";  
import { useState, useEffect, useContext } from "react";  
import { ProductContext } from "../services/ProductContext";  

const ProductList = () => {  
  const [productsList, setProductsList] = useState([]);  
  const [searchTerm, setSearchTerm] = useState("");  
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
      })  
      .catch((error) => console.log(error));  
  }, [isChanged]);  
 
  const filteredProducts = productsList.filter(product =>  
    product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||   
    product.code.toLowerCase().includes(searchTerm.toLowerCase())  
  );  

  const recentAddedProducts = filteredProducts  
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
        <h5 className="d-flex justify-content-center m-2">Busqueda rápida</h5>
        <input   
          type="text"  
          placeholder="Buscar por nombre o código"  
          value={searchTerm}  
          onChange={(e) => setSearchTerm(e.target.value)}  
          className="form-control my-3 mb-5" 
        />  
        {recentAddedProducts.length === 0 ? (  
          <h5 className="alert alert-danger mt-3" role="alert">No hay productos para mostrar</h5>  
        ) : (
          <div className="d-flex justify-content-center flex-column"> 
            <h5 className="mb-4">Productos agregados recientemente:</h5>
            <div className="d-flex flex-wrap">{recentAddedProducts}</div> 
          </div> 
        )}  
      </div>  
    </>  
  );  
};  

ProductList.propTypes = {  
  products: PropTypes.array,  
};  

export default ProductList;  