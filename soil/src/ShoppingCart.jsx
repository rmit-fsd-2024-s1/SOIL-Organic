// ShoppingCart.jsx

import React, { useContext } from "react";
import { CartContext } from "./SpecialsDeals";

function ShoppingCart() {
  const { cartItems, setCartItems } = useContext(CartContext);

  // Generate a random order ID
  const orderId = Math.floor(Math.random() * 1000000);

  // Calculate the total price
  const totalPrice = cartItems.reduce(
    (total, item) =>
      total + parseFloat(item.price.replace("$", "")) * item.quantity,
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
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="w-full max-w-md">
          <p className="text-lg font-bold mb-2">Order ID: {orderId}</p>
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="px-4 py-2">Item</th>
                <th className="px-4 py-2">Quantity</th>
                <th className="px-4 py-2">Price</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{item.item}</td>
                  <td className="border px-4 py-2">{item.quantity}</td>
                  <td className="border px-4 py-2">{item.price}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => removeFromCart(item)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
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
        </div>
      )}
    </div>
  );
}

export default ShoppingCart;
