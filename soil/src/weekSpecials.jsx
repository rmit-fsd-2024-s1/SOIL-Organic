import Banana from "./img/banana.jpg";
import Strawberry from "./img/strawberry.jpg";
import Watermelon from "./img/watermelon.jpg";
import Lemon from "./img/lemon.jpg";
import Apple from "./img/apple.jpg";
import Plum from "./img/plum.jpg";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { specials } from "./SpecialsDeals";
import sun from "./sun.jpeg";

function WeekSpecials() {
  const [specialsData, setSpecialsData] = useState([]);

  useEffect(() => {
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
          {specialsData.map((special, index) => (
            <div key={index} className="flex flex-col items-center">
              {special.item == "Organic Starwberry" && (
                <img src={Strawberry} alt="" className=" h-60" />
              )}
              {special.item == "Watermelon Seedless" && (
                <img src={Watermelon} alt="" className=" h-60" />
              )}
              {special.item == "Organic Bananas" && (
                <img src={Banana} alt="" className=" h-60" />
              )}
              {special.item == "Organic Lemon" && (
                <img src={Lemon} alt="" className=" h-60" />
              )}
              {special.item == "Apple Pink Ladies" && (
                <img src={Apple} alt="" className=" h-60" />
              )}
              {special.item == "Plum Queen Garnet" && (
                <img src={Plum} alt="" className=" h-60" />
              )}
              <div className="flex flex-col justify-center">

                <div className="flex justify-center py-3">
                  {special.item}
                </div>

                <div className="flex justify-center py-3">
                  <ul className="flex flex-row space-x-4">
                    <li className="px-3 py-2">
                      {special.sale}
                    </li>
                    <li className="line-through px-3 py-2">
                      {special.price}
                    </li>
                    <li className="bg-orange-400 px-3 py-2 rounded text-black">
                      Save {special.save}
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
