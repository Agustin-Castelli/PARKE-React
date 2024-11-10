import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import PropType from "prop-types"
import logoparke from "../../img/logo-parke.png"
import { AuthenticationContext } from "../services/authentication/authentication.Context";
import { useContext } from "react";

const NavBar = ({isLoggedIn, setIsLoggedIn, children}) => {
    const navigate = useNavigate();

    const { role } = useContext(AuthenticationContext);

    const isAuthorized = () => {
        return role === 'admin' || role === 'sysAdmin';
      }
    
      const isSysAdmin = () => {
        return role === 'sysAdmin';
      }

    const logOutHandler = () => {
        setIsLoggedIn(!isLoggedIn);
        navigate("/login");
      };

    const dashboardHandler = () => {
        navigate("/home");
    }

     const contactHandler = () => {
         navigate("/home/contact");
     }

     const addProductsHandler = () => {
        navigate("/home/addProducts");
     };

     const searchProductsHandler = () => {
        navigate("/home/searchProducts");
     }

     const userMenuHandler = () => {
        navigate("/home/userMenu");
     }

    return(
        <>
            <nav className="navba r navbar-expand-lg navbar-light custom-navbar">
                <div className="d-flex justify-content-between bg-dark w-100">   
                    <div className="d-flex"> 
                        <img src={logoparke} width={60} height={60} className="bg-info"/>
                        <Button className="btn-dark" onClick={dashboardHandler}>Inicio</Button>  
                        <Button className="btn-dark" onClick={contactHandler}>Contacto</Button>
                        <Button className="btn-dark" onClick={searchProductsHandler}>Buscar piezas</Button>
                        {isAuthorized() && <Button className="btn-dark" onClick={addProductsHandler}>Agregar piezas</Button>}
                    </div>
                    <div className="d-flex justify-content-end bg-dark w-100">
                    {isSysAdmin() && <Button className="btn-dark" onClick={userMenuHandler}>Usuarios</Button>}
                    <Button className="btn-dark" onClick={logOutHandler}>Cerrar sesión</Button>
                    </div>
                </div>  
            </nav>
            {children}
        </>
    )
};

NavBar.proptypes = {
    isLoggedIn: PropType.bool,
    setIsLoggedIn: PropType.func
};

export default NavBar;