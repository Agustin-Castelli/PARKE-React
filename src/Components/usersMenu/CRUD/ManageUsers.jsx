import { useState, useEffect, useContext } from "react";  
import { UserContext } from "../../services/UserContext";  
import { Card, CardBody, Button, Form, FormGroup, FormLabel, CardFooter } from "react-bootstrap";  

const ManageUsers = () => {  
  const [usersList, setUsersList] = useState([]);   
  const [userIdToUpdate, setUserIdToUpdate] = useState(null);  
  const [updatedUsername, setUpdatedUsername] = useState("");  
  const [updatedPassword, setUpdatedPassword] = useState("");
  const [updatedRole, setUpdatedRole] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const { isChanged, toggleChange } = useContext(UserContext);  

  useEffect(() => {  
    fetch("https://localhost:7016/api/User/GetAll", {  
      method: "GET",  
      headers: {  
        accept: "application/json",  
        Authorization: `Bearer ${localStorage.getItem("user-token")}`,  
      },  
    })  
      .then((response) => response.json())  
      .then((users) => {  
        setUsersList(users);  
      })  
      .catch((error) => console.log(error));  
  }, [isChanged]);  

  const deleteUserHandler = (id) => {  
    if (!id) {
      setErrorMsg("No se puedo actualizar los valores del usuario. ID no válido.");
      return;
    }; 
    fetch(`https://localhost:7016/api/User/Delete/${id}`, {  
      method: "DELETE",  
      headers: {  
        accept: "application/json",  
        Authorization: `Bearer ${localStorage.getItem("user-token")}`,  
      },  
    })  
      .then(() => {  
        toggleChange(); 
        setSuccessMsg(`Usuario ${id} eliminado satisfactoriamente.`); 
      })  
      .catch((error) => {
        console.log(error)
        setErrorMsg("No se pudo eliminar al usuario.");
      });  
  };  

  const updateUserHandler = (id, updatedUser) => {  
    if (!id) {
      setErrorMsg("No se puedo actualizar los valores del usuario. ID no válido.");
      return;
    }  

    fetch(`https://localhost:7016/api/User/Update/${id}`, {  
      method: "PUT",  
      headers: {  
        "Content-type": "application/json",  
        Authorization: `Bearer ${localStorage.getItem("user-token")}`,  
      },  
      body: JSON.stringify(updatedUser),  
    })  
      .then(() => {  
        toggleChange();   
        setSuccessMsg(`Usuario ${id} actualizado exitosamente.`);
        console.log(userIdToUpdate);
        setUserIdToUpdate(null);
        setUpdatedUsername("");
        setUpdatedPassword("");
        setUpdatedRole("");
      })  
      .catch((error) => {
        console.log(error)
        setErrorMsg("No se pudo actualizar el producto.");
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

  const submitUpdateForm = (event) => {  
    event.preventDefault();  
    const updatedUser = {  
      username: updatedUsername,  
      password: updatedPassword,
      rol: updatedRole, 
    };  
    updateUserHandler(userIdToUpdate, updatedUser);
  };  

  const usersMapped = usersList.map((user) => (  
    <div className="m-3" key={user.id}>  
      <Card>  
        <CardBody className="d-flex flex-column">  
          <h5>{user.username}</h5>  
          <p>Password: {user.password}</p>  
          <p>Rol: {user.rol}</p>  
        </CardBody>  
        <CardFooter className="d-flex justify-content-between">  
          <Button onClick={() => {  
            setUserIdToUpdate(user.id);  
            setUpdatedUsername(user.username);  
            setUpdatedPassword(user.password);  
            setUpdatedRole(user.rol);
          }}>Actualizar</Button>  
          <Button onClick={() => deleteUserHandler(user.id)} className="bg-danger border-danger">Eliminar</Button>  
        </CardFooter>  
      </Card>  
    </div>  
  ));

  return(
    <>  
    <h2>Gestión de Usuarios</h2>   
    

    <div className="d-flex justify-content-center flex-column">  
      <div className="d-flex flex-wrap">{usersMapped}</div>  
    </div>  
    
    {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
    {successMsg && <div className="alert alert-success">{successMsg}</div>}

    {userIdToUpdate && (  
      <Card>  
        <Card.Body>  
          <h5>Actualizar usuario</h5>  
          <Form onSubmit={submitUpdateForm}>  
            <FormGroup>  
              <FormLabel>Nombre de usuario</FormLabel>  
              <Form.Control  
                type="text"  
                value={updatedUsername}  
                onChange={(e) => setUpdatedUsername(e.target.value)}  
                placeholder="Nombre actual"  
              />  
            </FormGroup>  
            <FormGroup>  
              <FormLabel>Contraseña</FormLabel>  
              <Form.Control  
                type="text"  
                value={updatedPassword}  
                onChange={(e) => setUpdatedPassword(e.target.value)}  
                placeholder="Contraseña actual"  
              />
            </FormGroup> 
            <FormGroup>  
              <FormLabel>Rol del usuario</FormLabel>  
              <Form.Control  
                type="text"  
                value={updatedRole}  
                onChange={(e) => setUpdatedRole(e.target.value)}  
                placeholder="Rol actual"  
              />  
            </FormGroup> 
            <Button type="submit" variant="success">Actualizar Usuario</Button>  
          </Form>  
        </Card.Body>  
      </Card>  
    )};
  </>
  );
};

export default ManageUsers;