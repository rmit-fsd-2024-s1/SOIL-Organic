import React, { useState } from "react";
import { verifyPassword } from "./utils/hashPassword";
import { useNavigate } from "react-router-dom";

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
    <div className="flex flex-col items-center w-full h-96 justify-center">
      <div className="w-64">
        <h2 className="">Sign In</h2>
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
            className="hover:bg-orange-500 bg-orange-400 text-white px-6 py-3 rounded w-full"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signin;
