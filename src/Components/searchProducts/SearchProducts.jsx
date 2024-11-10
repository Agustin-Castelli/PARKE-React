import { Card, Button, CardBody, Form, FormGroup, FormLabel, CardFooter } from "react-bootstrap";
import { useContext, useState} from "react";
import useNotifications from "../custom-hooks/useNotifications";
import { ProductContext } from "../services/ProductContext";
import { AuthenticationContext } from "../services/authentication/authentication.Context";


const SearchProducts = () => {
  const [productName, setProductName] = useState("");
  const [productCode, setProductCode] = useState("");
  const [updatedName, setUpdatedName] = useState("");
  const [updatedCode, setUpdatedCode] = useState("");
  const [updatedImage, setUpdatedImage] = useState("");
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [productSearched, setProductSearched] = useState(null);
  const { notification, showNotification } = useNotifications();
  const { toggleChange } = useContext(ProductContext);
  const { role } = useContext(AuthenticationContext);

  const isAuthorized = () => {
    return role === 'admin' || role === 'sysAdmin';
  }

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
          showNotification("No se encontraron productos con ese nombre.", "danger");
        }
      })
      .catch((error) => {
        console.error(error);
        showNotification("Producto no encontrado.", "danger");
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
          showNotification("No se encontraron productos con ese código.", "danger")
        }
      })
      .catch((error) => {
        console.error(error);
        showNotification("Producto no encontrado.", "danger")
      });
  };

  const deleteProductHandler = (id) => {
    if (!id) {
      showNotification("No se puede eliminar el producto. ID no válido.", "danger")
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
        showNotification(`Producto ${id} eliminado satisfactoriamente.`, "success")
        setProductSearched(null); // Limpiar el producto buscado
      })
      .catch((error) => {
        console.error(error);
        showNotification("No se pudo eliminar el producto.", "danger")
      });
  };

  const updateProductHandler = (id, updatedProduct) => {
    if (!id) {
      showNotification("No se pudo actualizar la información del producto, ID no válido.", "danger");
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
        showNotification(`Producto ${id} actualizado satisfactoriamente.`, "success");
        setProductSearched(null);
      })
      .catch((error) => {
        console.log(error);
        showNotification("No se pudo actualizar el producto.", "danger");
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
    <div className="d-flex justify-content-center flex-column align-items-center">
      <h2 className="d-flex justify-content-center mt-5 mb-3 text-info">Menú de búsqueda</h2>
      <br />
      {notification && (  
        <div className={`alert alert-${notification.type} mt-3 d-flex justify-content-center w-50`} role="alert">  
          {notification.message}  
        </div>  
      )}
      <div className="d-flex justify-content-center flex-column w-25">
        <Card className="d-flex justify-content-center mb-3 bg-black text-white">
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
              <Button className="btn-info mt-3" type="submit" variant="primary">
                Buscar
              </Button>
            </Form>
          </CardBody>
        </Card>
        <br />
        <Card className="mb-3 bg-black text-white">
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
              <Button className="btn-info mt-3" type="submit" variant="primary">
                Buscar
              </Button>
            </Form>
          </CardBody>
        </Card>
      </div>

      {productSearched && (
        <div>
          <Card style={{ width: "18rem" }} key={productSearched.id} className="bg-dark text-white">
            <Card.Img
              variant="top"
              src={productSearched.productImage}
              alt="Imagen del producto"
            />
            <Card.Body className="p-2 m-3">
              <Card.Title>{productSearched.productName}</Card.Title>
              <Card.Text>Código: {productSearched.code}</Card.Text>
            </Card.Body>
            {isAuthorized() && <CardFooter className="d-flex flex-row justify-content-between">
              <Button onClick={clickUpdateHandler} className="m-1 btn-info text-dark">
                Actualizar información
              </Button>
              <Button
                onClick={() => deleteProductHandler(productSearched.id)}
                className="bg-danger border-danger m-1"
              >
                Eliminar producto
              </Button>
            </CardFooter>}
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
    </div>
  );
};

export default SearchProducts;
