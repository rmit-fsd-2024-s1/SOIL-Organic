//Signin page for users to login to their account
import React, { useState } from "react";
import { verifyUser } from "./data/repository";
import { useNavigate } from "react-router-dom";
import sun from "./img/sun.jpeg";
import { Link } from "react-router-dom";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email format.");
      return;
    }

    try {
      const user = await verifyUser(email, password);
      if (user) {
        // Save email to localStorage
        localStorage.setItem("user", JSON.stringify({ email: user.email }));

        // Provide visual cue upon successful login
        alert("Login successful! Redirecting to your profile.");
        navigate("/profile");
      } else {
        setError("Invalid email or password.");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError("An error occurred during user login.");
      }
    }
  };

  return (
    <div className="flex flex-col justify-center">
      <div className="flex items-center justify-center pb-20 py-20">
        <h1 className="text-3xl text-blue-500 font-bold flex items-center">
          <span>Welcome to SOIL!</span>
          <img className="h-10 w-10 ml-2" src={sun} alt="Sun" />
        </h1>
      </div>

      <div className="flex flex-col items-center w-full h-60 justify-center text-xl ">
        <div className="w-96">
          <h1 className="flex flex-col md:flex-row justify-center items-center">
            Sign In
          </h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full rounded-md bg-gray-200 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                className="mt-1 block w-full rounded-md bg-gray-200 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <p className="font-bond text-blue-500">{error}</p>}
            <br></br>
            <button
              type="submit"
              className="hover:bg-blue-300 bg-blue-400 text-white px-6 py-3 mb-5 rounded w-full"
            >
              Log In
            </button>
            <Link to="/signup">
              <p className="text-center text-blue-500 ">
                Don't have an account? Sign Up
              </p>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signin;
