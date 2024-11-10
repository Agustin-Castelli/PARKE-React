import { useState, useEffect } from "react";
import { UserContext } from "../../services/UserContext";
import { useContext } from "react";
import { Form, Card, CardBody, Button } from "react-bootstrap";



const CreateUser = () => {

    const [enteredUsername, setEnteredUsername] = useState("");
    const [enteredPassword, setEnteredPassword] = useState("");
    const [enteredRole, setEnteredRole] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const { toggleChange } = useContext(UserContext);

    const usernameHandler = (event) => {
        setEnteredUsername(event.target.value);
    }

    const passwordHandler = (event) => {
        setEnteredPassword(event.target.value);
    }

    const roleHandler = (event) => {
        setEnteredRole(event.target.value);
    }

    const submitUserHandler = (event) => {
        event.preventDefault();

        const roleNumber = Number(enteredRole);

        if (![0, 1, 2].includes(roleNumber)) {  
          setErrorMsg("Rol inválido. Debe ser 0, 1 o 2.");  
          return;  
        }
        const newUser = {
            username: enteredUsername,
            password: enteredPassword,
            rol: roleNumber
        }

        saveUserDataHandler(newUser)
    }

    const saveUserDataHandler = (newUserData) => {
        fetch("https://localhost:7016/api/User/Create", {
            method: "POST",
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("user-token")}`,
            },
            body: JSON.stringify(newUserData),
          })
            .then((response) => {
              if (response.ok) return response.json();
              else throw new Error("The response has some errors");
            })
            .then(() => {
              setSuccessMsg(`Usuario ${enteredUsername} creado exitosamente.`);
              toggleChange();
              setEnteredUsername("");
              setEnteredPassword("");
              setEnteredRole("");
              setErrorMsg("");
            })
            .catch((error) => {
              setErrorMsg(error.message || "Hubo un problema al crear al usuario.");
            });
    };

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

    return(
        <>
      <h2 className="d-flex justify-content-center text-info">
        Sección de agregado de usuarios
      </h2>
      {successMsg && <div className="alert alert-success">{successMsg}</div>}
      {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
      <Card className="m-4 p-3 w-50" bg="secondary">
        <CardBody>
          <Form className="text-white" onSubmit={submitUserHandler}>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Nombre de usuario</Form.Label>
              <Form.Control
                type="text"
                required
                value={enteredUsername}
                placeholder="Ingresar nombre de usuario..."
                onChange={usernameHandler}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>contraseña</Form.Label>
              <Form.Control
                type="text"
                required
                value={enteredPassword}
                placeholder="Ingresar contraseña..."
                onChange={passwordHandler}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="role">
              <Form.Label>Rol</Form.Label>
              <Form.Control
                type="number"
                required
                value={enteredRole}
                placeholder="Ingresar rol de usuario: (0: SysAdmin, 1: Administrador, 2: Empleado"
                onChange={roleHandler}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              className="bg-primary border-black"
            >
              Crear usuario
            </Button>
          </Form>
        </CardBody>
      </Card>
    </>
    )
};

export default CreateUser;