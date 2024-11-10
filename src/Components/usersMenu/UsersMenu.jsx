import { useState } from "react";  
import CreateUser from "./CRUD/CreateUser";  
import ManageUsers from "./CRUD/ManageUsers";
import { Button } from "react-bootstrap";

const UserMenu = () => {  
  const [activeComponent, setActiveComponent] = useState("");  

  const showCreateUser = () => setActiveComponent("create");  
  const showManageUsers = () => setActiveComponent("read");    
  
  return (  
    <div className="d-flex justify-content-center flex-column align-items-center">  
      <h2 className="text-center text-info mt-5 mb-3">Gestión de Usuarios</h2>  
      <div className="button-group text-center mb-4">  
        <Button className="btn-dark mx-1" onClick={showCreateUser}>Crear Usuario</Button>  
        <Button className="btn-dark mx-1" onClick={showManageUsers}>Gestionar Usuarios</Button>  
      </div>  

      {activeComponent === "create" && <CreateUser />}  
      {activeComponent === "read" && <ManageUsers />}  
    </div>  
  );  
};  

export default UserMenu;  