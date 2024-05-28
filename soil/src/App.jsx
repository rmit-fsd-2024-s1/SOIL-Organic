// App.jsx

import { Outlet, Link, useNavigate } from "react-router-dom";
import Account from "./img/my_account.png";
import "./app.css";
import sun from "./sun.jpeg";
import ShoppingCart from "./ShoppingCart";
import { useState } from "react";
function App() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [cartItems, setCartItems] = useState([]);

  const handleLogout = () => {
    // Remove user from localStorage
    localStorage.removeItem("user");
    // Navigate to the homepage
    navigate("/");
  };
  const addToCart = (item) => {
    const existingItem = cartItems.find(
      (cartItem) => cartItem.item === item.item
    );
    if (existingItem) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.item === item.item
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (item) => {
    setCartItems(cartItems.filter((cartItem) => cartItem.item !== item.item));
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#eae2cf] sedan-regular">
      <header className="h-12 bg-orange-600 text-white">
        <ul className="flex items-center justify-between h-full px-4">
          <li className="text-xl flex items-center">
            <Link to={"/"} className="flex items-center">
              <span>SOIL</span>
              <img className="h-10 w-10 ml-2" src={sun} alt="Sun" />
            </Link>
          </li>
          <div className="flex space-x-2 ">
            {user ? (
              <>
                <li>
                  <Link to={"/profile"} className="hover:bg-zinc-600">
                    <img src={Account} alt="" className="py-2 px-2" />
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="bg-[#eae2cf] px-3 py-2 rounded hover:bg-zinc-600 text-black"
                  >
                    Log Out
                  </button>
                </li>
                <li>
                  <Link
                    to={"/cart"}
                    className="bg-[#eae2cf] px-3 py-2 rounded hover:bg-zinc-600 text-black space-y-4"
                  >
                    Shopping Cart ({cartItems.length})
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <Link
                  to={"/signup"}
                  className="bg-[#eae2cf] px-3 py-2 rounded hover:bg-zinc-600 text-black"
                >
                  Sign In
                </Link>
              </li>
            )}
          </div>
        </ul>
      </header>
      <main className="flex-1">
        <Outlet context={{ addToCart, removeFromCart }} />
      </main>

      <footer className="h-8 flex items-center justify-center bg-orange-600 text-white">
        &copy;2024 SOIL
      </footer>
    </div>
  );
}

export default App;
