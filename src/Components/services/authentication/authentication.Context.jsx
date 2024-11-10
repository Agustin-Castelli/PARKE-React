import { useState, createContext, useEffect } from "react";
import PropType from "prop-types";

export const AuthenticationContext = createContext();

const userValue = JSON.parse(localStorage.getItem("user"));

export const AuthenticationContextProvider = ({ children }) => {

  const [user, setUser] = useState(userValue);
  const [role, setRole] = useState(userValue?.role || null);

  const handleUsernameLogin = (username, role) => {
    const newUser = {username, role};
    localStorage.setItem("user", JSON.stringify({ newUser }));  // puede que tenga que quitar los corchetes por un error si guardo un objeto adicional
    setUser(newUser);
    setRole(role);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("user-token")
    setUser(null);
    setRole(null);
  };

  useEffect(() => {  
    if (user) {  
        setRole(user.role); // Establece el rol al cargar el componente  
    }  
}, [user]); 

  return (
    <AuthenticationContext.Provider value={{ user, role, handleUsernameLogin, handleLogout }}>
      {children}
    </AuthenticationContext.Provider>
  );
};

AuthenticationContextProvider.propTypes = {
  children: PropType.object,
};
