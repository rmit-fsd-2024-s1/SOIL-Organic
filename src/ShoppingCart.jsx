// ShoppingCart.jsx
import React from "react";
import { useOutletContext } from "react-router-dom";

function ShoppingCart() {
  const { cartItems, removeFromCart } = useOutletContext();

  return (
    <div className="flex flex-col justify-center items-center px-8">
      <h2 className="text-2xl">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className="space-y-4">
          {cartItems.map((cartItem, index) => (
            <li key={index} className="flex items-center space-x-4">
              <span>{cartItem.item}</span>
              <span>Quantity: {cartItem.quantity}</span>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded"
                onClick={() => removeFromCart(cartItem)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ShoppingCart;
