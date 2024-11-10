import { useState } from "react";  
import CreateUser from "./CRUD/CreateUser";  
import ManageUsers from "./CRUD/ManageUsers";

const UserMenu = () => {  
  const [activeComponent, setActiveComponent] = useState("");  

  const showCreateUser = () => setActiveComponent("create");  
  const showManageUsers = () => setActiveComponent("read");    
  
  return (  
    <div>  
      <h1 className="text-center">Gestión de Usuarios</h1>  
      <div className="button-group text-center mb-4">  
        <button onClick={showCreateUser}>Crear Usuario</button>  
        <button onClick={showManageUsers}>Gestionar Usuarios</button>  
      </div>  

      {activeComponent === "create" && <CreateUser />}  
      {activeComponent === "read" && <ManageUsers />}  
    </div>  
  );  
};  

export default UserMenu;  