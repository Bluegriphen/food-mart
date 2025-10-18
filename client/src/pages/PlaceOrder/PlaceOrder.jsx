/**import { useContext } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
const PlaceOrder = () => {
  const { getTotalCartAmount } = useContext(StoreContext);
  return (
    <form className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input type="text" placeholder="First name" />
          <input type="text" placeholder="Last name" />
        </div>
        <input type="email" placeholder="Email address" />
        <input type="text" placeholder="Street" />
        <div className="multi-fields">
          <input type="text" placeholder="City" />
          <input type="text" placeholder="State" />
        </div>

        <div className="multi-fields">
          <input type="text" placeholder="Zip code" />
          <input type="text" placeholder="Country" />
        </div>
        <input type="text" placeholder="Phone" />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>{2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <p>${getTotalCartAmount() + 2}</p>
            </div>
          </div>
          <button>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
*/

import { useContext } from "react";
import axios from "axios";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";

const PlaceOrder = () => {
  const { cartItems, token, url, getTotalCartAmount, setCartItems } = // Added setCartItems
    useContext(StoreContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Check for token
    if (!token) {
        alert("You must be logged in to place an order.");
        // Optional: redirect to login/sign-up page here
        return; 
    }

    const formData = new FormData(e.target);
    const orderData = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      street: formData.get("street"),
      city: formData.get("city"),
      state: formData.get("state"),
      zipCode: formData.get("zipCode"),
      country: formData.get("country"),
      phone: formData.get("phone"),
      cart: cartItems,
      amount: getTotalCartAmount() + 2 // Pass the total amount
    };

    try {
      const response = await axios.post(url + "/api/order/place", orderData, {
        headers: {token} // Key is 'token', value is the variable token
      });

      if (response.data.success) {
        alert("Order placed successfully!");
        setCartItems({}); // Clear cart on successful order
        // Optional: Redirect user to confirmation page or order history
      } else {
        alert("Order failed: " + (response.data.message || "An unknown error occurred."));
      }
      
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again. Check console for details.");
    }
  };

  return (
    <form className="place-order" onSubmit={handleSubmit}>
      {/* ... (rest of the form remains the same) ... */}
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input type="text" name="firstName" placeholder="First name" required/>
          <input type="text" name="lastName" placeholder="Last name" required/>
        </div>
        <input type="email" name="email" placeholder="Email address" required/>
        <input type="text" name="street" placeholder="Street" required/>
        <div className="multi-fields">
          <input type="text" name="city" placeholder="City" required/>
          <input type="text" name="state" placeholder="State" required/>
        </div>
        <div className="multi-fields">
          <input type="text" name="zipCode" placeholder="Zip code" required/>
          <input type="text" name="country" placeholder="Country" required/>
        </div>
        <input type="text" name="phone" placeholder="Phone" required/>
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>2</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <p>${getTotalCartAmount() + 2}</p>
            </div>
          </div>
          {/* Disable button if cart is empty */}
          <button 
            type="submit"
            disabled={getTotalCartAmount() === 0}
            className={getTotalCartAmount() === 0 ? 'disabled' : ''}
          >
            PROCEED TO PAYMENT
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;