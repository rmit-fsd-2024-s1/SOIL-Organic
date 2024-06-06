import React, { useEffect, useState, createContext } from "react";
import { getStandardProducts, getSpecialProducts } from "./data/repository";

export const CartContext = createContext();

function SpecialsDeals() {
  const [standardProducts, setStandardProducts] = useState([]);
  const [specialProducts, setSpecialProducts] = useState([]);
  const [quantities, setQuantities] = useState({});

  // Define quantities state
  const [cartItems, setCartItems] = useState(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const standardProducts = await getStandardProducts();
        setStandardProducts(standardProducts);

        const specialProducts = await getSpecialProducts();
        setSpecialProducts(specialProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Update localStorage whenever cartItems or quantities change
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Increase quantity function
  const increaseQuantity = (item) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [item.item_name]: (prevQuantities[item.item_name] || 0) + 1,
    }));
  };

  // Decrease quantity function
  const decreaseQuantity = (item) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [item.item_name]: Math.max((prevQuantities[item.item_name] || 0) - 1, 0),
    }));
  };

  const addToCart = (item) => {
    const quantity = quantities[item.item_name] || 0;

    if (quantity > 0) {
      setCartItems((prevCartItems) => {
        const existingItemIndex = prevCartItems.findIndex(
          (cartItem) => cartItem.item === item.item_name
        );

        if (existingItemIndex !== -1) {
          const updatedCartItems = prevCartItems.map((cartItem, index) => {
            if (index === existingItemIndex) {
              return {
                ...cartItem,
                quantity: cartItem.quantity + quantity,
              };
            }
            return cartItem;
          });
          return updatedCartItems;
        } else {
          const newCartItem = {
            item: item.item_name,
            quantity,
            price: item.sale_price,
          };
          return [...prevCartItems, newCartItem];
        }
      });

      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [item.item_name]: 0,
      }));
    }
    alert("Item added to cart!");
  };

  return (
    <CartContext.Provider value={{ cartItems, setCartItems }}>
      <div className="flex flex-col justify-center items-center px-8">
        <h1 className="flex justify-center text-3xl py-8">Shop</h1>
        <div className="flex flex-row justify-center items-center px-8 py-12 w-full">
          <div className="flex flex-col items-center">
            <div className="grid grid-cols-2 gap-4">
              {standardProducts.map((product) => (
                <div
                  key={product.item_name}
                  className="flex flex-col items-center"
                >
                  <img
                    src={product.image}
                    alt={product.item_name}
                    className="h-60 w-80"
                  />
                  <div className="flex justify-center text-2xl py-2 text-blond">
                    {product.item_name}
                  </div>
                  <p>{product.description}</p>
                  <p>Sale: ${product.sale_price}</p>
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-orange-400 text-white px-4 py-2 rounded mt-4"
                  >
                    Add to Cart
                  </button>
                  <div className="flex flex-row space-x-10 text-2xl">
                    <button onClick={() => decreaseQuantity(product)}>-</button>
                    <div>{quantities[product.item_name] || 0}</div>
                    <button onClick={() => increaseQuantity(product)}>+</button>
                  </div>
                </div>
              ))}
            </div>
            <h2 className="text-2xl py-4">Special Products</h2>
            <div className="grid grid-cols-2 gap-4">
              {specialProducts.map((product) => (
                <div
                  key={product.item_name}
                  className="flex flex-col items-center"
                >
                  <img
                    src={product.image}
                    alt={product.item_name}
                    className="h-60 w-80"
                  />
                  <div className="flex flex-col justify-center">
                    <div className="flex justify-center text-2xl py-2 text-blond">
                      {product.item_name}
                    </div>
                    <p>{product.description}</p>
                    <div className="flex justify-center py-3">
                      <ul className="flex flex-row space-x-4 items-center">
                        <li className="px-3 py-2">${product.sale_price}</li>
                        <li className="line-through px-3 py-2">
                          ${product.price}
                        </li>
                        <li className="bg-orange-400 px-3 py-2 rounded text-black">
                          Save ${product.save_price}
                        </li>
                      </ul>
                    </div>
                  </div>
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-orange-400 text-white px-4 py-2 rounded mt-4"
                  >
                    Add to Cart
                  </button>
                  <div className="flex flex-row space-x-10 text-2xl">
                    <button onClick={() => decreaseQuantity(product)}>-</button>
                    <div>{quantities[product.item_name] || 0}</div>
                    <button onClick={() => increaseQuantity(product)}>+</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </CartContext.Provider>
  );
}

export default SpecialsDeals;

