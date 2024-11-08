import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthenticationContextProvider } from "./Components/services/authentication/authentication.Context.jsx";
import App from "./App.jsx";
import "./index.css";
import { ProductContextProvider } from "./Components/services/authentication/ProductContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthenticationContextProvider>
      <ProductContextProvider>
        <App />
      </ProductContextProvider>
    </AuthenticationContextProvider>
  </StrictMode>
);
