// Desc: Signup component for the application
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { createUser, findByEmail } from "./data/repository";
import sun from "./img/sun.jpeg";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email format.");
      return;
    }

    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!strongPasswordRegex.test(password)) {
      setError(
        "Please enter a strong password. It must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character."
      );
      return;
    }

    try {
      // Check if user already exists
      const existingUser = await findByEmail(email);
      if (existingUser) {
        setError("User already exists.");
        return;
      }

      // Get the current date
      const joinDate = new Date().toISOString();

      // Create user in the database
      const user = await createUser({
        username: name,
        email,
        password, // Send the plain password; the API will hash it
        date_of_joining: joinDate,
      });
      localStorage.setItem("user", JSON.stringify({ email: user.email }));

      // Provide visual cue upon successful registration
      alert("Registration successful! You are now logged in.");

      // Redirect to profile page
      navigate("/profile");
    } catch (error) {
      setError("An error occurred while creating the user.");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center pb-20 py-20">
        <h1 className="text-3xl text-orange-600 font-bold flex items-center">
          <span>Welcome to SOIL!</span>
          <img className="h-10 w-10 ml-2" src={sun} alt="Sun" />
        </h1>
      </div>
      <div className="flex flex-col items-center w-full justify-center h-60 text-xl">
        <div className="w-64 ">
          <h1 className="flex flex-col items-center py-8">
            <strong>Create an Account</strong>
          </h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="newname">Name:</label>
              <input
                type="text"
                id="newname"
                className="mt-1 block w-full rounded-md bg-gray-200 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="newemail">Email:</label>
              <input
                type="email"
                id="newemail"
                className="mt-1 block w-full rounded-md bg-gray-200 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="newpassword">Password:</label>
              <input
                type="password"
                id="newpassword"
                className="mt-1 block w-full rounded-md bg-gray-200 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input
                type="password"
                id="confirmPassword"
                className="mt-1 block w-full rounded-md bg-gray-200 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            {error && <p className="font-bold text-orange-700">{error}</p>}
            <br></br>
            <button
              type="submit"
              className="hover:bg-orange-500 bg-orange-400 text-white px-6 py-3 rounded w-full"
            >
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
