import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Signin from "./Signin.jsx";
import Home from "./Home.jsx";
import Signup from "./Signup.jsx";
import AuthPage from "./AuthPage.jsx";
import Profile from "./Profile.jsx";
import SpecialsDeals from "./SpecialsDeals.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ShoppingCart from "./ShoppingCart.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>Not Found!</div>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Signin />,
      },
      {
        path: "/signup",
        element: <AuthPage />,
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
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
