import { useState, createContext } from "react";
import PropType from "prop-types";

export const AuthenticationContext = createContext();

const userValue = JSON.parse(localStorage.getItem("user"));

export const AuthenticationContextProvider = ({ children }) => {

  const [user, setUser] = useState(userValue);

  const handleUsernameLogin = (username) => {
    localStorage.setItem("user", JSON.stringify({ username }));
    setUser({ username });
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthenticationContext.Provider value={{ user, handleUsernameLogin, handleLogout }}>
      {children}
    </AuthenticationContext.Provider>
  );
};

AuthenticationContextProvider.propTypes = {
  children: PropType.object,
};
