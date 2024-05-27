import React from "react";
import Signin from "./Signin";
import Signup from "./Signup";
import sun from "./sun.jpeg";

const AuthPage = () => {
  return (
    <div className="flex flex-col justify-center ">
      <div className="flex items-center justify-center pb-20 py-20">
        <h1 className="text-3xl text-orange-600 font-bold flex items-center">
          <span>Welcome to SOIL!</span>
          <img className="h-10 w-10 ml-2" src={sun} alt="Sun" />
        </h1>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center">
        <div className="md:w-1/2">
          <Signin />
        </div>
        <div className="md:w-1/2">
          <Signup />
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
