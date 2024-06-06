// OrderDetails.jsx

import React, { useEffect, useState } from "react";

function OrderDetails() {
  const [order, setOrder] = useState(null);
  const urlParams = new URLSearchParams(window.location.search);
  const orderId = urlParams.get("orderId");

  useEffect(() => {
    fetch(`/api/carts/${orderId}`)
      .then((response) => response.json())
      .then((data) => {
        setOrder(data);
      })
      .catch((error) => {
        console.error("Error fetching order:", error);
      });
  }, [orderId]);

  return (
    <div className="flex flex-col items-center mt-8">
      <h2 className="text-2xl font-bold mb-4">Order Details</h2>
      {order ? (
        <div className="w-full max-w-md">
          <p className="text-lg font-bold mb-2">Order ID: {order.orderId}</p>
          <table className="w-full text-left border border-black">
            <thead>
              <tr>
                <th className="border border-black px-4 py-2">Item</th>
                <th className="border border-black px-4 py-2">Quantity</th>
                <th className="border border-black px-4 py-2">Price</th>
                <th className="border border-black px-4 py-2">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-black px -4 py-2">
                  {order.item_name}
                </td>
                <td className="border border-black px-4 py-2">
                  {order.quantity}
                </td>
                <td className="border border-black px-4 py-2">
                  ${order.price.toFixed(2)}
                </td>
                <td className="border border-black px-4 py-2">
                  ${order.totalPrice.toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <p>Loading order details...</p>
      )}
    </div>
  );
}

export default OrderDetails;