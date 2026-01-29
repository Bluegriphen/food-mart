import "./footer.css";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <div className="logo">
            Food <span>Marts</span>
          </div>
          <p>
            Welcome to Food Mart — where technology meets taste. With just a few
            clicks, explore a world of flavors, curated menus, and fresh picks
            delivered with speed and care. Our platform is designed to bring
            convenience to your fingertips and flavor to your plate. Whether
            you're a busy professional, a home cook, or a foodie on the go, Food
            Mart is here to simplify your food journey.
          </p>
          <div className="footer-social-icons">
            <img
              src="https://img.icons8.com/color/24/000000/facebook-new.png"
              alt=""
            />
            <img
              src="https://img.icons8.com/color/24/000000/twitter--v1.png"
              alt=""
            />
            <img
              src="https://img.icons8.com/color/24/000000/linkedin.png"
              alt=""
            />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+1 211-456-7890</li>
            <li>contact@foodmart.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        © 2025 Food Mart | All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
