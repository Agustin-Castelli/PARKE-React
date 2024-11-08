import { useState, createContext } from "react";
import PropType from "prop-types";


export const ProductContext = createContext();

export const ProductContextProvider = ({ children }) => {

    const [isChanged, setIsChanged] = useState(false);

    const toggleChange = () => {
        setIsChanged(prev => !prev);
    };

    return (
        <ProductContext.Provider value={{ toggleChange, isChanged }}>
          {children}
        </ProductContext.Provider>
      );
};

ProductContextProvider.propTypes = {
    children: PropType.object,
};