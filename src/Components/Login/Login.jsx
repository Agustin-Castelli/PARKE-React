import { Card, Button, Form, Col, FormGroup, Row } from "react-bootstrap";
import { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import logoparke from "../../img/logo-parke.png" 
import { AuthenticationContext } from "../services/authentication/authentication.Context";
import { jwtDecode } from "jwt-decode";

const Login = ({onLogin}) => {
  const [loginWindow, setLoginWindow] = useState(false);

  const navigate = useNavigate();

  const clickLogin = () => {
    setLoginWindow(!loginWindow);
  };

  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [errors, setErrors] = useState({
    username: false,
    password: false,
  });

  const [showErrorLogin, setShowErrorLogin] = useState(false) // variable que utilizo para mostrar un mensaje en caso de que las credenciales sean incorrectas

  const { handleUsernameLogin } = useContext(AuthenticationContext)

  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const usernameHandler = (event) => {
    setErrors({ ...errors, username: false });
    setEnteredUsername(event.target.value);
    setShowErrorLogin(false);
  };

  const passwordHandler = (event) => {
    setErrors({ ...errors, password: false });
    setEnteredPassword(event.target.value);
    setShowErrorLogin(false);
  };

  const submitLogin = async (event) => {
    console.log("executed");
    event.preventDefault();
    if (usernameRef.current.value.length === 0) {
      usernameRef.current.focus();
      setErrors({ ...errors, username: true });
      return;
    }
    if (passwordRef.current.value.length === 0) {
      passwordRef.current.focus();
      setErrors({ ...errors, password: true });
      return;
    }

    const isSuccess = await handleLogin(enteredUsername, enteredPassword);

    if (isSuccess) {   
      onLogin(); // Notifico que el usuario ha iniciado sesión  
      navigate("/home"); // Navega a la página principal
      console.log(localStorage.getItem("user-token"));
  } else {  
      // Muestra un mensaje de error adecuado si el inicio de sesión falla  
      setErrors({ ...errors, username: false, password: false });
      setShowErrorLogin(true);
  }
    setEnteredUsername("");
    setEnteredPassword("");
  };

  const handleLogin = async (username, password) => {
    try {
      const res = await fetch("https://localhost:7016/api/Authentication/Authenticate", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        // si la respuesta no fue OK lanza un error
        const errorData = await res.json(); // detalles del error  
        throw new Error(errorData.message || "Login failed");
      }

      const data = await res.text();

      localStorage.setItem("user-token", data);
      decodeTokenAndSetRole(data)
      setErrors({
        username: false,  
        password: false
      });
      return true;
    } 
    
    catch (error) {
      setErrors({ username: false, password: true });
      console.log(error);
      return false;
    }
  };

  const decodeTokenAndSetRole = (token) => {
    try {
      const decoded = jwtDecode(token);
      const role = decoded.role;

      handleUsernameLogin(enteredUsername, role); // Guardo el nombre de usuario y el rol en el contexto 
    }
    catch (error) {
      console.error("Error decoding token:", error);
    }
  }

  return (
    <div className="d-flex justify-content-center flex-column">
      <div className="text-center m-4">
        <img 
          src={logoparke}
          className="rounded" 
          alt="..."
          width="400px"
          
        />
      </div>
      <div className="text-center">
        <div className="mt-3 d-flex justify-content-center">
          {loginWindow ? (
            ""
          ) : (
            <div>
            <Button className="mb-3" style={{padding: "10px 150px"}} onClick={clickLogin}>
              <h3>Ingresar</h3>
            </Button>
            <p>Dont have an account? <a className="text-danger" href="">Sign up</a></p>  {/* ACA IRÍA LA FUNCION PARA REDIRIGIR AL FORM DE REGISTRO DE USUARIO */}
            </div>
          )}
        </div>
        {loginWindow ? (
          <Card className="shadow bg-light m-5 d-flex align-items-center w-50">
            <Card.Body>
              <Row className="mb-3">
                <h4>Bienvenido a</h4>
                <h3>PARKE Parts System</h3>
              </Row>
              <Form onSubmit={submitLogin}>
                <FormGroup className="mb-4">
                  <Form.Control
                    className={errors.username && "border border-danger"}
                    type="text"
                    // required
                    ref={usernameRef}
                    placeholder="Ingresar nombre de usuario"
                    onChange={usernameHandler}
                    value={enteredUsername}
                  />
                </FormGroup>
                <FormGroup className="mb-4">
                  <Form.Control
                    className={errors.password && "border border-danger"}
                    type="password"
                    ref={passwordRef}
                    // required
                    placeholder="Ingresar contraseña"
                    onChange={passwordHandler}
                    value={enteredPassword}
                  />
                </FormGroup>
                <p className="text-warning">
                  {errors.username || errors.password
                    ? "Debe completar todos los campos para iniciar sesión."
                    : ""}
                </p>
                {showErrorLogin && ( 
                  <p className="text-danger">Usuario o contraseña inválido/s. Por favor, intente nuevamente.</p>  
                )}
                <Row>
                  <Col />
                  <Col md={6} className="d-flex justify-content-end">
                    <Button variant="secondary" type="submit">
                      Iniciar sesión
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

Login.propTypes = {
  onLogin: PropTypes.func,
};

export default Login;