import { useState } from "react";
import { UserContext } from "../../services/UserContext";
import { useContext } from "react";
import useNotifications from "../../custom-hooks/useNotifications";
import { Form, Card, CardBody, Button } from "react-bootstrap";


const CreateUser = () => {

    const [enteredUsername, setEnteredUsername] = useState("");
    const [enteredPassword, setEnteredPassword] = useState("");
    const [enteredRole, setEnteredRole] = useState("");
    const { notification, showNotification } = useNotifications();  

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
          showNotification("Rol inválido. Debe ser 0, 1 o 2.", "danger") 
          return;  
        }
        const newUser = {
            username: enteredUsername,
            password: enteredPassword,
            rol: roleNumber
        }

        saveUserDataHandler(newUser);
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
              showNotification(`Usuario ${enteredUsername} creado exitosamente.`, "success");
              toggleChange();
              setEnteredUsername("");
              setEnteredPassword("");
              setEnteredRole("");
            })
            .catch(() => {
              showNotification("Hubo un problema al crear al usuario.", "danger");
            });
    };

    return(
        <>
      <h2 className="d-flex justify-content-center text-info">
        Sección de agregado de usuarios
      </h2>
      {notification && (  
        <div className={`alert alert-${notification.type} mt-3`} role="alert">  
          {notification.message}  
        </div>  
      )}
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