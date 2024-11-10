import { useContext, useState } from "react";
import { Button, Form, Card, CardBody } from "react-bootstrap";
import { ProductContext } from "../services/ProductContext";
import useNotifications from "../custom-hooks/useNotifications";

import PropTypes from "prop-types";

const NewProduct = () => {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [img, setImg] = useState("");

  const { notification, showNotification } = useNotifications();

  const { toggleChange } = useContext(ProductContext);

  const changeNameHandler = (event) => {
    setName(event.target.value);
  };

  const changeCodeHandler = (event) => {
    setCode(event.target.value);
  };

  const changeImgHandler = (event) => {
    setImg(event.target.value);
  };

  const submitProductHandler = (event) => {
    event.preventDefault();
    const newProduct = {
      productName: name,
      code: code,
      productImage: img,
    };
    saveDataProductHandler(newProduct);
  };

  const saveDataProductHandler = (newProductData) => {
    fetch("https://localhost:7016/api/Product", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("user-token")}`,
      },
      body: JSON.stringify(newProductData),
    })
      .then((response) => {
        if (response.ok) return response.json();
        else throw new Error("The response has some errors");
      })
      .then(() => {
        showNotification(`Producto ${name} creado exitosamente.`, 'success');
        toggleChange();
        setName("");
        setCode("");
        setImg("");
      })
      .catch(() => {
        showNotification('Hubo un problema al crear el producto.', 'danger');
      });
  };

  return (
    <div className="d-flex justify-content-center flex-column align-items-center">
      <h2 className="text-info mt-5 mb-3">
        Sección de agregado de piezas
      </h2>
      {notification && (  
        <div className={`alert alert-${notification.type} mt-3`} role="alert">  
          {notification.message}  
        </div>  
      )}
      <Card className="m-4 p-3 w-50 bg-black" bg="secondary">
        <CardBody>
          <Form className="text-white" onSubmit={submitProductHandler}>
            <Form.Group className="mb-3" controlId="ProductName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                required
                value={name}
                placeholder="Ingresar nombre"
                onChange={changeNameHandler}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="ProductCode">
              <Form.Label>Codigo</Form.Label>
              <Form.Control
                type="text"
                required
                value={code}
                placeholder="Ingresar codigo"
                onChange={changeCodeHandler}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="ProductImg">
              <Form.Label>Imagen</Form.Label>
              <Form.Control
                type="text"
                required
                value={img}
                placeholder="Ingresar imagen"
                onChange={changeImgHandler}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              className="btn-info"
            >
              Agregar producto
            </Button>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

NewProduct.propTypes = {
  onAddProduct: PropTypes.func,
};

export default NewProduct;
