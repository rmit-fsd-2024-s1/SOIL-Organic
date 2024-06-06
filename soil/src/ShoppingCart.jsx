// ShoppingCart.jsx

import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "./SpecialsDeals";
import { Link } from "react-router-dom";
import sun from "./img/sun.jpeg";
import axios from "axios";

function ShoppingCart() {
  const { cartItems, setCartItems } = useContext(CartContext);
  const {quantities, setQuantities} = useState({});

  useEffect(() => {
    const storedQuantities = localStorage.getItem('quantities');
    if (storedQuantities) {
      try {
        setQuantities(JSON.parse(storedQuantities));
      } catch (e) {
        console.error("Failed to parse quantities from localStorage", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('quantities', JSON.stringify(quantities));
  }, [quantities]);

  // Generate a random order ID
  const orderId = Math.floor(Math.random() * 1000000);

  // Calculate the total price
  const totalPrice = cartItems.reduce(
    (total, item) =>
      total + parseFloat(item.price) * item.quantity,
    0
  );

  // Remove item from cart
  const removeFromCart = (item) => {
    const updatedCartItems = cartItems.filter(
      (cartItem) => cartItem.item !== item.item
    );
    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  return (
    <div className="flex flex-col items-center mt-8">
      <h2 className="flex text-2xl font-bold mb-4 ">
        <span>Shopping Cart</span>
        <img className="h-10 w-10 ml-2" src={sun} alt="Sun" />
      </h2>
      <div className="flex flex-row">
        <Link to={"/specialsDeals"}>
          <span>Go back</span>
        </Link>
        <Link to={"/orders"}>
          <span>Order History</span>
        </Link>
      </div>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
      <div className="w-full max-w-md">
        <p className="text-lg font-bold mb-2">Order ID: {orderId}</p>
        <table className="w-full text-left border border-black">
          <thead>
            <tr>
              <th className="border border-black px-4 py-2 ">Item</th>
              <th className="border border-black px-4 py-2">Quantity</th>
              <th className="border border-black px-4 py-2">Price</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => (
              <tr key={index}>
                <td className="border border-black px-4 py-2">{item.item}</td>
                <td className="border border-black px-4 py-2">
                  <div>{item.quantity}</div>
                  {/* <div className="flex flex-row space-x-10 text-2xl items-center">
                      <button onClick={() => decreaseQuantity(item)}>
                        -
                      </button>
                      <div>{item.quantity}</div>
                      <button onClick={() => increaseQuantity(item)}>
                        +
                      </button>
                  </div> */}
                </td>
                <td className="border border-black px-4 py-2">${item.price} per kg</td>
                <td className="border border-black px-4 py-2">
                  <button
                    onClick={() => removeFromCart(item)}
                    className="bg-blue-400 hover:bg-blue-300 text-white px-2 py-1 rounded"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-lg font-bold mt-4">
          Total Price: ${totalPrice.toFixed(2)}
        </p>
        {/* <div>
          <button onClick={clearCart}>
            Cancle
          </button>
          <button onClick={submitOrder}>
            Submit
          </button>
        </div> */}
      </div>
      )}
    </div>
  );
}

export default ShoppingCart;
