import {
  Card,
  Button,
  CardBody,
  Form,
  FormGroup,
  FormLabel,
  CardFooter,
} from "react-bootstrap";
import { useContext, useState, useEffect } from "react";
import { ProductContext } from "../services/ProductContext";

const SearchProducts = () => {
  const [productName, setProductName] = useState("");
  const [productCode, setProductCode] = useState("");
  const [updatedName, setUpdatedName] = useState("");
  const [updatedCode, setUpdatedCode] = useState("");
  const [updatedImage, setUpdatedImage] = useState("");
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [productSearched, setProductSearched] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const { toggleChange } = useContext(ProductContext);

  const productNameHandler = (event) => {
    setProductName(event.target.value);
  };

  const productCodeHandler = (event) => {
    setProductCode(event.target.value);
  };

  const submitSearchCodeHandler = (event) => {
    event.preventDefault();
    getProductByCode();
    setProductCode("");
  };

  const submitSearchNameHandler = (event) => {
    event.preventDefault();
    getProductByName();
    setProductName("");
  };

  const getProductByName = () => {
    fetch(`https://localhost:7016/api/Product/GetByName?name=${productName}`, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("user-token")}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la búsqueda del producto.");
        }
        return response.json();
      })
      .then((product) => {
        if (product) {
          setProductSearched(product);
        } else {
          setErrorMsg("No se encontraron productos con ese nombre.");
        }
      })
      .catch((error) => {
        console.error(error);
        setErrorMsg("Producto no encontrado.");
      });
  };

  const getProductByCode = () => {
    fetch(`https://localhost:7016/api/Product/GetByCode?code=${productCode}`, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("user-token")}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la búsqueda del producto");
        }
        return response.json();
      })
      .then((product) => {
        if (product) {
          setProductSearched(product);
        } else {
          setErrorMsg("No se encontraron productos con ese código.");
        }
      })
      .catch((error) => {
        console.error(error);
        setErrorMsg("Producto no encontrado.");
      });
  };

  const deleteProductHandler = (id) => {
    if (!id) {
      setErrorMsg("No se puede eliminar el producto. ID no válido.");
      return;
    }
    fetch(`https://localhost:7016/api/Product/Delete/${id}`, {
      method: "DELETE",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("user-token")}`,
      },
    })
      .then(() => {
        toggleChange();
        setSuccessMsg(`Producto ${id} eliminado satisfactoriamente.`);
        setProductSearched(null); // Limpiar el producto buscado
      })
      .catch((error) => {
        console.error(error);
        setErrorMsg("No se pudo eliminar el producto.");
      });
  };

  // Reseteo de mensajes después de 3 segundos
  useEffect(() => {
    if (successMsg) {
      const timer = setTimeout(() => {
        setSuccessMsg("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMsg]);

  useEffect(() => {
    if (errorMsg) {
      const timer = setTimeout(() => {
        setErrorMsg("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errorMsg]);

  const updateProductHandler = (id, updatedProduct) => {
    if (!id) {
      setErrorMsg(
        "No se pudo actualizar la información del producto, ID no válido."
      );
      return;
    }
    fetch(`https://localhost:7016/api/Product/Update/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("user-token")}`,
      },
      body: JSON.stringify(updatedProduct),
    })
      .then(() => {
        toggleChange();
        setSuccessMsg(`Producto ${id} actualizado satisfactoriamente.`);
        setProductSearched(null);
      })
      .catch((error) => {
        console.log(error);
        setErrorMsg("No se pudo actualizar el producto.");
      });
  };

  const submitUpdateForm = (event) => {
    event.preventDefault();
    const updatedProduct = {
      productName: updatedName,
      code: updatedCode,
      productImage: updatedImage,
    };
    updateProductHandler(productSearched.id, updatedProduct);
    setShowUpdateForm(!showUpdateForm);
  };

  const clickUpdateHandler = () => {
    setShowUpdateForm(!showUpdateForm);
  };

  return (
    <>
      <h2>Menú de búsqueda</h2>
      <br />
      {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
      {successMsg && <div className="alert alert-success">{successMsg}</div>}

      <div>
        <Card>
          <CardBody>
            <Form onSubmit={submitSearchNameHandler}>
              <FormGroup>
                <FormLabel>Buscar por nombre</FormLabel>
                <Form.Control
                  required
                  type="text"
                  placeholder="Ingrese el nombre del producto"
                  value={productName}
                  onChange={productNameHandler}
                />
              </FormGroup>
              <Button type="submit" variant="primary">
                Buscar
              </Button>
            </Form>
          </CardBody>
        </Card>
        <br />
        <Card>
          <CardBody>
            <Form onSubmit={submitSearchCodeHandler}>
              <FormGroup>
                <FormLabel>Buscar por código</FormLabel>
                <Form.Control
                  required
                  type="text"
                  placeholder="Ingrese el código del producto"
                  value={productCode}
                  onChange={productCodeHandler}
                />
              </FormGroup>
              <Button type="submit" variant="primary">
                Buscar
              </Button>
            </Form>
          </CardBody>
        </Card>
      </div>

      {productSearched && (
        <div>
          <Card style={{ width: "18rem" }} key={productSearched.id}>
            <Card.Img
              variant="top"
              src={productSearched.productImage}
              alt="Imagen del producto"
            />
            <Card.Body className="p-2 m-3">
              <Card.Title>{productSearched.productName}</Card.Title>
              <Card.Text>Código: {productSearched.code}</Card.Text>
            </Card.Body>
            <CardFooter className="d-flex flex-row justify-content-between">
              <Button onClick={clickUpdateHandler} className="m-1">
                Actualizar información
              </Button>
              <Button
                onClick={() => deleteProductHandler(productSearched.id)}
                className="bg-danger border-danger m-1"
              >
                Eliminar producto
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
      {showUpdateForm && (
        <Card>
          <Card.Body>
            <h5>Actualizar producto</h5>
            <Form onSubmit={submitUpdateForm}>
              <FormGroup>
                <FormLabel>Nombre</FormLabel>
                <Form.Control
                  type="text"
                  value={updatedName}
                  onChange={(e) => setUpdatedName(e.target.value)}
                  placeholder={productSearched.productName} // Placeholder para mostrar el nombre actual
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>Código</FormLabel>
                <Form.Control
                  type="text"
                  value={updatedCode}
                  onChange={(e) => setUpdatedCode(e.target.value)}
                  placeholder={productSearched.code} // Placeholder para mostrar el código actual
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>Imagen</FormLabel>
                <Form.Control
                  type="text"
                  value={updatedImage}
                  onChange={(e) => setUpdatedImage(e.target.value)}
                  placeholder={productSearched.productImage} // Placeholder para mostrar la imagen actual
                />
              </FormGroup>
              <Button type="submit" variant="success">
                Actualizar Producto
              </Button>
            </Form>
          </Card.Body>
        </Card>
      )}
    </>
  );
};

export default SearchProducts;
