import { useContext, useState } from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";
import {
  FaSearch,
  FaShoppingCart,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";
import { IoBagHandle } from "react-icons/io5";
import { StoreContext } from "../../context/StoreContext";

const NavBar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("menu");
  const [showDropdown, setShowDropdown] = useState(false);

  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <div className="navbar">
      {/* logo */}
      <div className="logo">
        <Link to="/" onClick={() => setMenu("home")}>
          Food <span>Marts</span>
        </Link>
      </div>

      {/* menu links */}
      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          home
        </Link>
        <a
          href="#explore-menu"
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? "active" : ""}
        >
          menu
        </a>
        <a
          href="#footer"
          onClick={() => setMenu("contact-us")}
          className={menu === "contact-us" ? "active" : ""}
        >
          contact us
        </a>
      </ul>

      {/* right side icons */}
      <div className="navbar-right">
        <FaSearch className="icon" />

        <div className="navbar-search-icon">
          <Link to="/cart">
            <FaShoppingCart className="icon" />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>

        {/* user/login */}
        {!token ? (
          <button onClick={() => setShowLogin(true)}>Sign In</button>
        ) : (
          <div
            className="navbar-profile"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <FaUserCircle className="icon profile-icon" />
            {showDropdown && (
              <ul className="nav-profile-dropdown">
                <li>
                  <IoBagHandle className="icon" />
                  <p>Orders</p>
                </li>
                <li onClick={handleLogout}>
                  <FaSignOutAlt className="icon" />
                  <p>Logout</p>
                </li>
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
