import "./Header.css";
import foodImage from "/Header1.jpg";
const Header = () => {
  return (
    <header className="header">
      <div className="header-text">
        <h1>
          Order your <span>favourite</span> food here
        </h1>
        <p>
          Choose from a diverse menu featuring a delectable array of dishes
          crafted with the finest ingredients and culinary expertise. Our
          mission is satisfy your cravings and elevate your dining experience,
          one delicious meal at a time.
        </p>
        <button className="header-btn">View Menu</button>
      </div>
      <div className="header-image">
        <img src={foodImage} alt="Delicious Food" />
      </div>
    </header>
  );
};

export default Header;
/**<div className="header">
        <div className="header-contents">
            <h1>Order your <span>favourite</span> food here</h1>
            <p>Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise. Our mission is satisfy your cravings and elevate your dining experience, one delicious meal at a time.</p>
            <button className="header-btn">View Menu</button>
            
            <div className="header-image">
                <img src={foodImage} alt="Delicious Food"/>
            </div>
        </div>
    </div> */
