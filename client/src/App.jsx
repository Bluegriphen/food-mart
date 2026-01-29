import "./App.css";
import NavBar from "./components/navbar/NavBar";
import Footer from "./components/Footer/Footer";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import LoginPoppup from "./components/Login/LoginPoppup";
import MyOrder from "./components/MyOrders/MyOrder";
import { useState } from "react";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {showLogin && <LoginPoppup setShowLogin={setShowLogin} />}
      <div className="app">
        <NavBar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
           <Route path="/myorders" element={<MyOrder/>}/> 
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
