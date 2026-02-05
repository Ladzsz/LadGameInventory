import "../assets/styles/headerStyles.css";
import gamelogo from "../assets/images/Gamelogo.png";
import { Link } from "react-router-dom";
import SignOutButton from "./signoutBtn";
import { useState, useEffect } from "react";

function Header() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const user = JSON.parse(atob(token.split('.')[1]));

  // Re-check token when component mounts or when storage changes
  useEffect(() => {
    const checkToken = () => {
      setToken(localStorage.getItem("token"));
    };

    // Listen for storage changes
    window.addEventListener("loginStateChange", checkToken);

    return () => window.removeEventListener("loginStateChange", checkToken);
  }, []);

  return (
    <header>
      <div id="heading-container">
        <h1 id="header-title">Lad Game Inventory</h1>

        <p id="header-text">A neat little game inventory app made by Lad</p>
      </div>

      <nav id="header-navbar">
        <Link to="/">Home</Link>
        <Link to="/games">Games</Link>
        {user?.is_admin && <Link to="/categories">Categories</Link>}
        {token ? (
          <SignOutButton onSignOut={() => setToken(null)} />
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>

      <img src={gamelogo} alt="Logo" />
    </header>
  );
}

export default Header;
