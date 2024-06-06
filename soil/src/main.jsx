import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Signin from "./Signin.jsx";
import Home from "./Home.jsx";
import Signup from "./Signup.jsx";
import Profile from "./Profile.jsx";
import SpecialsDeals from "./SpecialsDeals.jsx";
import { CartContext } from "./SpecialsDeals.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ShoppingCart from "./ShoppingCart.jsx";
import OrderDetails from "./orderDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <CartContext.Provider value={{ cartItems: [], setCartItems: () => {} }}>
        <App />
      </CartContext.Provider>
    ),
    errorElement: <div>Not Found!</div>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/signin",
        element: <Signin />,
      },

      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/specialsDeals",
        element: <SpecialsDeals />,
      },
      {
        path: "/cart",
        element: <ShoppingCart />,
      },
      {
        path: "/orders",
        element: <OrderDetails />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
