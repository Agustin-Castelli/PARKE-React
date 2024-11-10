import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import PropType from "prop-types"
import logoparke from "../../img/logo-parke.png"

const NavBar = ({isLoggedIn, setIsLoggedIn, children}) => {
    const navigate = useNavigate();

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
                <div className="d-flex justify-content-between bg-primary w-100">   
                    <div className="d-flex"> 
                        <img src={logoparke} width={60} height={60} className=""/>
                        <Button onClick={dashboardHandler}>Inicio</Button>  
                        <Button onClick={contactHandler}>Contacto</Button>
                        <Button onClick={searchProductsHandler}>Buscar piezas</Button>
                        <Button onClick={addProductsHandler}>Agregar piezas</Button>
                    </div>
                    <div className="d-flex justify-content-end bg-primary w-100">
                    <Button onClick={userMenuHandler}>Usuarios</Button>
                    <Button onClick={logOutHandler}>Cerrar sesión</Button>
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