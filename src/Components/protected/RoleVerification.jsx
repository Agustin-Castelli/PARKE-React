import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';  
import { AuthenticationContext } from './authentication/authentication.Context';

const RoleVerification = ({ children, requiredRole }) => {  
    const { user } = useContext(AuthenticationContext);  
    const navigate = useNavigate();

    // Si no hay usuario o si el rol del usuario no es el requerido, redirige a la ruta de inicio
    if (!user || (requiredRole && user.role !== requiredRole)) {  
      return navigate("/home");  
    }  
  
    return children;  
  };  

  export default RoleVerification;