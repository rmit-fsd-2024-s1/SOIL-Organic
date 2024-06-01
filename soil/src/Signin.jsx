import React, { useState } from "react";
import { verifyPassword } from "./utils/hashPassword";
import { useNavigate } from "react-router-dom";
import Signup from "./Signup";
import sun from "./img/sun.jpeg";
import { Link } from "react-router-dom";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate inputs
    if (!email || !password) {
      setError("Please input a valid email and password.");
      return;
    }

    // Get user from localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find((u) => u.email == email);
    if (!user) {
      setError("No user found. Please register first.");
      return;
    }

    // Verify password
    const isPasswordValid = verifyPassword(password, user.password);
    if (!isPasswordValid) {
      setError("Invalid email or password.");
      return;
    }

    // Provide visual cue upon successful login
    localStorage.setItem("user", JSON.stringify(user));
    alert("Login successful!");
    navigate("/");
  };

  return (
    <div className="flex flex-col justify-center">
      <div className="flex items-center justify-center pb-20 py-20">
        <h1 className="text-3xl text-orange-600 font-bold flex items-center">
          <span>Welcome to SOIL!</span>
          <img className="h-10 w-10 ml-2" src={sun} alt="Sun" />
        </h1>
      </div>

      <div className="flex flex-col items-center w-full h-60 justify-center text-xl ">
        <div className="w-64">
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
            {error && <p className="font-bond text-orange-700">{error}</p>}
            <br></br>
            <button
              type="submit"
              className="hover:bg-orange-500 bg-orange-400 text-white px-6 py-3 mb-5 rounded w-full"
            >
              Log In
            </button>
            <Link to="/signup">
              <p className="text-center text-orange-500 ">
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
