import React, { useEffect, useState, createContext, useContext } from "react";
import Banana from "./img/banana.jpg";
import Strawberry from "./img/strawberry.jpg";
import Watermelon from "./img/watermelon.jpg";
import Lemon from "./img/lemon.jpg";
import Apple from "./img/apple.jpg";
import Plum from "./img/plum.jpg";

export const CartContext = createContext();

const specials = [
  {
    item: "Organic Starwberry",
    price: "$12.90 per kg",
    sale: "$7.90 per kg",
    save: "$5.00",
    quality: "10000",
  },
  {
    item: "Watermelon Seedless",
    price: "$7.50 per kg",
    sale: "$4.50 per kg",
    save: "$3.00",
    quality: "10000",
  },
  {
    item: "Organic Bananas",
    price: "$7.90 per kg",
    sale: "$5.90 per kg",
    save: "$2.00",
    quality: "10000",
  },
  {
    item: "Organic Lemon",
    price: "$10.90 per kg",
    sale: "$6.50 per kg",
    save: "$4.40",
    quality: "10000",
  },
  {
    item: "Apple Pink Ladies",
    price: "$11.90 per kg",
    sale: "$6.90 per kg",
    save: "$5.00",
    quality: "10000",
  },
  {
    item: "Plum Queen Garnet",
    price: "$9.30 per kg",
    sale: "$5.40 per kg",
    save: "$3.90",
    quality: "10000",
  },
];

function SpecialsDeals() {
  const [cartItems, setCartItems] = useState([]);

  const Specials = () => {
    // Define quantities state
    const [cartItems, setCartItems] = useState(() => {
      const storedCartItems = localStorage.getItem("cartItems");
      return storedCartItems ? JSON.parse(storedCartItems) : [];
    });
    const [quantities, setQuantities] = useState({});
    useEffect(() => {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    // Increase quantity function
    const increaseQuantity = (item) => {
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [item]: (prevQuantities[item] || 0) + 1,
      }));
    };

    // Decrease quantity function
    const decreaseQuantity = (item) => {
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [item]: Math.max((prevQuantities[item] || 0) - 1, 0),
      }));
    };

    // Add to cart function
    const addToCart = (item) => {
      const quantity = quantities[item.item] || 0;

      if (quantity > 0) {
        const newCartItem = {
          item: item.item,
          quantity: quantity,
          price: item.sale,
        };
        setCartItems((prevCartItems) => {
          // Check if the item already exists in the cart
          const existingItemIndex = prevCartItems.findIndex(
            (cartItem) => cartItem.item === newCartItem.item
          );

          // If the item already exists in the cart, update the quantity
          if (existingItemIndex !== -1) {
            const updatedCartItems = [...prevCartItems];
            updatedCartItems[existingItemIndex].quantity +=
              newCartItem.quantity;
            return updatedCartItems;
          } else {
            return [...prevCartItems, newCartItem];
          }
        });
      }
      alert("Item added to cart!");
    };
    // Save cartItems to local storage whenever it changes
    useEffect(() => {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    const [specialsData, setSpecialsData] = useState([]);

    // Initialize state
    useEffect(() => {
      localStorage.setItem("specials", JSON.stringify(specials));

      const savedSpecials = JSON.parse(localStorage.getItem("specials"));
      if (savedSpecials) {
        setSpecialsData(savedSpecials);
      } else {
        localStorage.setItem("specials", JSON.stringify(specials));
        setSpecialsData(specials);
      }
    }, []);

    return (
      <div>
        <div className="flex justify-center flex-col space-x-4">
          <div>
            {specialsData.map((special, index) => (
              <div key={index} className="flex flex-row py-4 items-center ">
                <div className="flex flex-col items-center w-2/3 md: w-1/2">
                  {special.item == "Organic Starwberry" && (
                    <img src={Strawberry} alt="" className=" h-96" />
                  )}
                  {special.item == "Watermelon Seedless" && (
                    <img src={Watermelon} alt="" className=" h-96" />
                  )}
                  {special.item == "Organic Bananas" && (
                    <img src={Banana} alt="" className="py-2 h-96" />
                  )}
                  {special.item == "Organic Lemon" && (
                    <img src={Lemon} alt="" className="py-2 h-96" />
                  )}
                  {special.item == "Apple Pink Ladies" && (
                    <img src={Apple} alt="" className="py-2 h-96" />
                  )}
                  {special.item == "Plum Queen Garnet" && (
                    <img src={Plum} alt="" className="py-2 h-96" />
                  )}
                </div>
                <div className="flex flex-col items-center md:w-1/2">
                  <div className="flex flex-col text-xl w-4/5">
                    <div className="flex justify-center text-2xl py-2 text-blond">
                      {special.item}
                    </div>
                    {special.item == "Organic Starwberry" && (
                      <p>
                        Our organic strawberries come from organic farms around
                        Victoria and sometimes Queensland, free from any harmful
                        pesticides or herbicides.
                        <br></br>
                        Along with our whole range of organic fruits and
                        vegetables, we don't keep any fresh produce in storage.
                        All our strawberries arrive fresh from the farm, and
                        then we deliver to your door in Melbourne.
                      </p>
                    )}
                    {special.item == "Watermelon Seedless" && (
                      <p>
                        This week we have organic seedless watermelon available.
                        Sweet, juicy and super refreshing. Enjoy eating them
                        knowing they are organic and spray-free - so every ounce
                        of this fruit will nourish your body without any harmful
                        chemicals.
                        <br></br>
                        Watermelons are high in water and fibre. They are full
                        of important electrolytes and help prevent dehydration
                        during our beautiful summer months.
                        <br></br>
                        They also help to prevent constipation and promote
                        regularity for a healthy digestive tract.
                        <br></br>
                        When you eat watermelon you are really doing your body a
                        favour!
                      </p>
                    )}
                    {special.item == "Organic Bananas" && (
                      <p>
                        Grab yourself a hand of organic bananas when you place
                        your weekly organic veggie box order.
                        <br></br>
                        Or we do have 6.5kg boxes of these delicious guys if you
                        need more!
                      </p>
                    )}
                    {special.item == "Organic Lemon" && (
                      <p>
                        Need extra apples? Enjoy these beautiful Australian
                        organic apples knowing there are no chemicals or
                        additives, just good old-fashioned apples.
                      </p>
                    )}
                    {special.item == "Apple Pink Ladies" && (
                      <p>
                        Certified organic lemons. Fresh, tangy and delicious
                        organic lemons ready for you this week - very juicy!
                      </p>
                    )}
                    {special.item == "Plum Queen Garnet" && (
                      <p>
                        Queen Garnet Plums are firm, juicy & sweet. These
                        delicious dark purple, organic Queen Garnet Plums are
                        full of amazing antioxidants and of course no chemicals
                        or sprays.
                        <br></br>
                        This variety of plum originated in Queensland and is
                        known as the superfood plum! They stay on the tree for
                        longer and during that time they develop higher levels
                        of antioxidants. In fact they say one Queen Garnet plum
                        can provide all the antioxidants you need in a day.
                      </p>
                    )}
                  </div>
                  <div className="flex flex-row space-x-2">
                    <div className="px-3 py-2">{special.sale}</div>
                    <div className="line-through px-3 py-2">
                      {special.price}
                    </div>
                    <div className="bg-orange-400 px-3 py-2 rounded text-black">
                      Save {special.save}
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={() => addToCart(special)}
                      className="bg-orange-400 text-white px-4 py-2 rounded mt-4"
                    >
                      Add to Cart
                    </button>

                    <div className="flex flex-row space-x-10 text-2xl">
                      <button onClick={() => decreaseQuantity(special.item)}>
                        -
                      </button>
                      <div>{quantities[special.item] || 0}</div>
                      <button onClick={() => increaseQuantity(special.item)}>
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <CartContext.Provider value={{ cartItems, setCartItems }}>
      <div className="flex flex-col justify-center items-center px-8">
        <h1 className="flex justify-center text-3xl py-8">Specials Deals</h1>
        <div className="flex flex-row justify-center items-center px-8 py-12 md: w-full">
          <Specials />
        </div>
      </div>
    </CartContext.Provider>
  );
}

export default SpecialsDeals;
export { specials };
