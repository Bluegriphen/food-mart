import "./Navbar.css";
import { assets } from "../../assets/assets";

const Navbar = () => {
  return (
    <div className="navbar">
      {/** logo */}
      <div className="logo">
        Food <span>Marts</span>
      </div>
      <img className="profile" src={assets.profile_image} />
    </div>
  );
};

export default Navbar;
