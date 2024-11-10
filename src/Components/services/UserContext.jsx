import { useState, createContext } from "react";
import PropType from "prop-types";


export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {

    const [isChanged, setIsChanged] = useState(false);

    const toggleChange = () => {
        setIsChanged(prev => !prev);
    };

    return (
        <UserContext.Provider value={{ toggleChange, isChanged }}>
          {children}
        </UserContext.Provider>
      );
};

UserContextProvider.propTypes = {
    children: PropType.object,
};