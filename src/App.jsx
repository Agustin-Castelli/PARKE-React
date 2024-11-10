import Login from "./Components/Login/Login";
import Dashboard from "./Components/Dashboard/Dashboard";
import UserMenu from "./Components/usersMenu/UsersMenu";
import PageNotFound from "./Components/pageNotFound/PageNotFound";
import Unauthorized from "./Components/unauthorized/Unauthorized";
import NavBar from "./Components/navBar/NavBar";
import Contact from "./Components/contact/Contact";
import NewProduct from "./Components/newProduct/NewProduct";
import SearchProducts from "./Components/searchProducts/SearchProducts";

import { useContext, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Protected from "./Components/protected/Protected";
import { AuthenticationContext } from "./Components/services/authentication/authentication.Context";
import { Navigate } from "react-router-dom";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { role } = useContext(AuthenticationContext);

  const loginHandler = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  const isAuthorized = () => {
    return role === 'admin' || role === 'sysAdmin';
  }

  const isSysAdmin = () => {
    return role === 'sysAdmin';
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Protected isSignedIn={isLoggedIn} />,
      children: [
        {
          path: "/home",
          element: (
            <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}>
              <Dashboard/>
            </NavBar>
          ),
        },
        {
          path: "/home/contact",
          element: (
            <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}>
              <Contact />
            </NavBar>
          ),
        },
        {
          path: "home/addProducts",
          element: isAuthorized()? (
            <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}>
              <NewProduct/>
            </NavBar>
          ) : (
            <Navigate to="/unauthorized" replace />
          ),
        },
        {
          path: "home/searchProducts",
          element: (
            <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}>
              <SearchProducts/>
            </NavBar>
          ),
        },
        {
          path: "home/userMenu",
          element: isSysAdmin()? (
            <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}>
              <UserMenu/>
            </NavBar>
          ) : (
            <Navigate to="/unauthorized" replace />
          )
        }
      ],
    },
    {
      path: "/login",
      element: <Login onLogin={loginHandler} />,
    },
    {
      path: "*",
      element: <PageNotFound />,
    },
    {
      path: "/unauthorized",
      element: <Unauthorized/>
    }
  ]);

  return <>{<RouterProvider router={router} />}</>;
}

export default App;
