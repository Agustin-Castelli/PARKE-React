import Login from "./Components/Login/Login";
import Dashboard from "./Components/Dashboard/Dashboard";
import PageNotFound from "./Components/pageNotFound/PageNotFound";

import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Protected from "./Components/protected/Protected";
import ProductDetails from "./Components/productDetails/ProductDetails";
import NavBar from "./Components/navBar/NavBar";
import Contact from "./Components/contact/Contact";
import NewProduct from "./Components/newProduct/NewProduct";
import SearchProducts from "./Components/searchProducts/SearchProducts";

function App() {
  // const demoProducts = [
  //   {
  //     id: 1,
  //     name: "prod1",
  //     code: "code1",
  //     img: "url-img",
  //   },
  //   {
  //     id: 2,
  //     name: "prod2",
  //     code: "code2",
  //     img: "url-img",
  //   },
  //   {
  //     id: 3,
  //     name: "prod3",
  //     code: "code3",
  //     img: "url-img",
  //   },
  // ];

  // useEffect(() => {
  //   const productsStored = JSON.parse(localStorage.getItem("products"));
  //   if (productsStored) setProductsList(productsStored);
  // }, []);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginHandler = () => {
    setIsLoggedIn(!isLoggedIn);
  };

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
          path: "/home/product/:id",
          element: (
            <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}>
              <ProductDetails />
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
          element: (
            <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}>
              <NewProduct/>
            </NavBar>
          ),
        },
        {
          path: "home/searchProducts",
          element: (
            <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}>
              <SearchProducts />
            </NavBar>
          ),
        },
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
  ]);

  return <>{<RouterProvider router={router} />}</>;
}

export default App;

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: (
//       <Protected isSignedIn={isLoggedIn}>
//         <Dashboard isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
//       </Protected>
//     ),
//   },
//   {
//     path: "/login",
//     element: <Login onLogin={loginHandler} />,
//   },
//   {
//     path: "product/:id",
//     element: <ProductDetails/>
//   }
// ]);
