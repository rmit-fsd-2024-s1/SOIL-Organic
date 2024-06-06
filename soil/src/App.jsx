import { Outlet, Link, useNavigate } from "react-router-dom";
import Account from "./img/my_account.png";
import "./app.css";
import sun from "./img/sun.jpeg";
import { useState, useEffect } from "react";
import { CartContext } from "./SpecialsDeals";
import cart from "./img/cart.png";

function App() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    // Remove user from localStorage
    localStorage.removeItem("user");
    // Navigate to the homepage
    navigate("/");
  };

  const [cartItems, setCartItems] = useState([]);

  // Get the cart items from local storage when the component mounts
  useEffect(() => {
    const savedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    if (savedCartItems.length > 0) {
      setCartItems(savedCartItems);
    }
  }, []);

  const [email, setEmail] = useState("");
  const [userEmail, setUserEmail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const user = await findByEmail(email);
      if (user) {
        setUserEmail(user.email);
      } else {
        setError("User not found");
      }
    } catch (err) {
      console.error("Error fetching user email:", err);
      setError("Error fetching user email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, setCartItems }}>
      <div className="flex flex-col min-h-screen bg-[#eae2cf] sedan-regular">
        <header className="h-12 bg-orange-600 text-white">
          <ul className="flex items-center justify-between h-full px-4">
            <li className="text-xl flex items-center">
              <Link to={"/"} className="flex items-center">
                <span>SOIL</span>
                <img className="h-10 w-10 ml-2" src={sun} alt="Sun" />
              </Link>
            </li>
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <li>
                    <Link to={"/profile"} className="hover:bg-zinc-600">
                      <img src={Account} alt="Profile" className="icon" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/cart"}
                      className="bg-[#eae2cf] rounded hover:bg-zinc-600 text-black "
                    >
                      <img src={cart} alt="Cart" className="icon" />
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="bg-[#eae2cf] px-3 py-2 rounded hover:bg-zinc-600 text-black"
                    >
                      Log Out
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <Link
                    to={"/signin"}
                    className="bg-[#eae2cf] px-3 py-2 rounded hover:bg-zinc-600 text-black"
                  >
                    Sign In
                  </Link>
                </li>
              )}
            </div>
          </ul>
          <div>
            <form onSubmit={handleSubmit}></form>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {userEmail && <Profile email={userEmail} />}
          </div>
        </header>
        <div className="flex-grow">
          <Outlet />
        </div>
        <footer className="h-8 flex items-center justify-center bg-orange-600 text-white">
          &copy;2024 SOIL
        </footer>
      </div>
    </CartContext.Provider>
  );
}

export default App;
