
import React, { useState, useEffect } from "react";
import {
  getUser,
  updateUser,
  deleteUser,
  findByEmail,
} from "./data/repository";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [joinDate, setJoinDate] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser && storedUser.email) {
        const email = storedUser.email;
        try {
          const userData = await getUser(email);
          setUser(userData);
          setName(userData.username);
          setUserEmail(userData.email);
          setJoinDate(userData.date_of_joining);
        } catch (error) {
          console.error("Error fetching user data:", error);
          setError("User not found!");
        }
      }
    };

    fetchUser();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setPassword("");
    setConfirmPassword("");
  };

  const handleDelete = async () => {
    try {
      await deleteUser(userEmail);
      alert("Your account has been deleted successfully!");
      localStorage.removeItem("user");
      navigate("/");
    } catch (error) {
      console.error("Error deleting user account:", error);
      setError("Failed to delete account.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation checks
    if (!name || !userEmail || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(userEmail)) {
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
      const existingUser = await findByEmail(userEmail);
      if (existingUser && existingUser.email !== user.email) {
        setError("This email has been registered, please change email!");
        return;
      }
    } catch (error) {
      console.error("Error checking email:", error);
      setError("Failed to check email.");
      return;
    }

    const updatedUser = {
      username: name,
      email: userEmail,
      password,
    };

    try {
      await updateUser(user.email, updatedUser);
      alert("Profile updated successfully!");
      setIsEditing(false);
      setUser({ ...updatedUser, date_of_joining: joinDate });
      localStorage.setItem("user", JSON.stringify({ email: userEmail }));
    } catch (error) {
      console.error("Error updating user data:", error);
      setError("Failed to update profile.");
    }
  };

  return (
    <div className="flex items-center justify-center flex-col mt-10">
      <div className="flex flex-col items-center justify-center w-max ">
        <h2 className="text-2xl text-orange-600">
          <strong>{user ? user.username : ""}'s Profile</strong>
        </h2>
        <div className="flex flex-col mt-8">
          <div className="py-2">
            <label>Name: {user ? user.username : ""}</label>
          </div>
          <div className="py-2">
            <label>Email: {user ? user.email : ""}</label>
          </div>

          <div className="py-2">
            <label>Join Date: {new Date(joinDate).toLocaleDateString()}</label>
          </div>

        </div>
        {!isEditing && (
          <div className="flex space-x-5 ">
            <button
              onClick={handleEdit}
              className="hover:bg-orange-600 bg-orange-500 text-white px-10 py-3 rounded mt-4"
            >
              Edit Profile
            </button>
            <button
              onClick={handleDelete}
              className="hover:bg-orange-600 bg-orange-500 text-white px-10 py-3 rounded mt-4"
            >
              Delete Profile
            </button>
          </div>
        )}
        {isEditing && (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center justify-center w-full max-w-md"
          >
            <div className="py-2 flex flex-col w-full">
              <label>Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full rounded-md bg-white focus:border-gray-500 focus:bg-white focus:ring-0"
              />
            </div>
            <div className="py-2 flex flex-col w-full">
              <label>Email:</label>
              <input
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className="mt-1 block w-full rounded-md bg-white focus:border-gray-500 focus:bg-white focus:ring-0"
              />
            </div>
            <div className="py-2 flex flex-col w-full">
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full rounded-md bg-white focus:border-gray-500 focus:bg-white focus:ring-0"
              />
            </div>
            <div className="py-2 flex flex-col w-full">
              <label>Confirm Password:</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 block w-full rounded-md bg-white focus:border-gray-500 focus:bg-white focus:ring-0"
              />
            </div>
            {error && <p className="font-bold text-orange-700">{error}</p>}
            <div className="flex justify-center space-x-4 mt-4 w-full">
              <button
                type="submit"
                className="hover:bg-orange-600 bg-orange-500 text-white px-6 py-3 rounded w-full"
              >
                Save
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="hover:bg-orange-600 bg-orange-500 text-white px-6 py-3 rounded w-full"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Profile;
