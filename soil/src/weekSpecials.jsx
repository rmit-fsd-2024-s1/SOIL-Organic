import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import sun from "./img/sun.jpeg";
import { getSpecialProducts } from "./data/repository";

function WeekSpecials() {
  const [specialProducts, setSpecialProducts] = useState([]);
  // const [specialsData, setSpecialsData] = useState([]);

  useEffect(() => {
    const fetchSpecialProducts = async () => {
      try {
        const specialProducts = await getSpecialProducts();
        setSpecialProducts(specialProducts);
      } catch (error) {
        console.error('Error fetching special products:', error);
      }
    };
    fetchSpecialProducts();
  }, []);

  return (
    <div>
      <h1 className="flex justify-center text-2xl">
        Specials for This Week<img className="h-10 w-10 ml-2" src={sun}></img>
      </h1>
      <br></br>
      <div className="flex justify-between text-xl">
        <div className="flex flex-col w-1/3">
          <p>
            Each Saturday Morning we release the week's special availability. We
            have a variety of seasonal spray-free & organic fruit.
          </p>
        </div>
        <div>
          <Link to="/specialsDeals">
            <span>More details</span>
          </Link>
        </div>
      </div>
      <div className="flex justify-center items-center py-12">
        <div className="grid grid-cols-3 space-x-3">
          {specialProducts.map((product) => (
            <div key={product.item_name} className="flex flex-col items-center">
              <img src={product.image} alt={product.item_name} className="h-60 w-80"/>
              <div className="flex flex-col justify-center">
                <div className="flex justify-center py-3">{product.item_name}</div>
                <div className="flex justify-center py-3">
                  <ul className="flex flex-row space-x-4 items-center">
                    <li className="px-3 py-2">
                      ${product.sale_price}
                    </li>
                    <li className="line-through px-3 py-2">
                      ${product.price}
                    </li>
                    <li className="bg-orange-400 px-3 py-2 rounded text-black">
                      Save ${product.save_price}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WeekSpecials;
