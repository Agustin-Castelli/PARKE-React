import { useContext, useState, useEffect } from "react";
import { Button, Form, Card, CardBody } from "react-bootstrap";
import { ProductContext } from "../services/ProductContext";
import PropTypes from "prop-types";

const NewProduct = () => {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [img, setImg] = useState("");

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

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
        setSuccessMsg(`Producto ${name} creado exitosamente.`);
        toggleChange();
        setName("");
        setCode("");
        setImg("");
        setErrorMsg("");
      })
      .catch((error) => {
        setErrorMsg(error.message || "Hubo un problema al crear el producto.");
      });
  };

  // Reseteo de mensajes de éxito después de 3 segundos
  useEffect(() => {
    if (successMsg) {
      const timer = setTimeout(() => {
        setSuccessMsg("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMsg]);

  // Reseteo de mensajes de error después de 3 segundos
  useEffect(() => {
    if (errorMsg) {
      const timer = setTimeout(() => {
        setErrorMsg("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errorMsg]);

  return (
    <>
      <h2 className="d-flex justify-content-center text-info">
        Sección de agregado de piezas
      </h2>
      {successMsg && <div className="alert alert-success">{successMsg}</div>}
      {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
      <Card className="m-4 p-3 w-50" bg="secondary">
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
              className="bg-primary border-black"
            >
              Agregar producto
            </Button>
          </Form>
        </CardBody>
      </Card>
    </>
  );
};

NewProduct.propTypes = {
  onAddProduct: PropTypes.func,
};

export default NewProduct;
