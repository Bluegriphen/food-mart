import { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",  // ✅ Corrected field name
    country: "",
    phone: ""
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting order data:", data);
    if (!token) {
      alert("Please log in to place an order.");
      return;
    } 
    const orderDetails = {
      userId: token,
      items: Object.keys(cartItems).map((itemId) => {
        const itemInfo = food_list.find((food) => food._id === itemId);
        return {
          _id: itemId,
          name: itemInfo.name,
          price: itemInfo.price,
          quantity: cartItems[itemId]
        };
      }
      ),
      amount: getTotalCartAmount() + 2, // Including delivery fee
      address: data
    };
    console.log("Order details to be sent:", orderDetails);
    const placeOrder = async () => {
      try {
        const response = await fetch(url + "/api/order/place", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(orderDetails)
        });
        const result = await response.json();
        console.log("Order placement response:", result);
        if (result.success) {
          window.location.href = result.session_url; // Redirect to Stripe checkout
        } else {
          alert("Failed to place order: " + result.message);
        }
      } catch (error) {
        console.error("Error placing order:", error);
        alert("An error occurred while placing the order. Please try again.");
      }
    };
    placeOrder();


    // 🔧 Add API call here if needed
  };

  // ✅ Optional: Check if form is valid
  const isFormValid = Object.values(data).every((field) => field.trim() !== "");

  useEffect(() => {
    console.log(data);

  }, [data]);

  return (
    <form className="place-order" onSubmit={handleSubmit}>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            name="firstName"
            onChange={onChangeHandler}
            value={data.firstName}
            type="text"
            placeholder="First name"
          />
          <input
            name="lastName"
            onChange={onChangeHandler}
            value={data.lastName}
            type="text"
            placeholder="Last name"
          />
        </div>
        <input
          name="email"
          onChange={onChangeHandler}
          value={data.email}
          type="email"
          placeholder="Email address"
        />
        <input
          name="street"
          onChange={onChangeHandler}
          value={data.street}
          type="text"
          placeholder="Street"
        />
        <div className="multi-fields">
          <input
            name="city"
            onChange={onChangeHandler}
            value={data.city}
            type="text"
            placeholder="City"
          />
          <input
            name="state"
            onChange={onChangeHandler}
            value={data.state}
            type="text"
            placeholder="State"
          />
        </div>
        <div className="multi-fields">
          <input
            name="zipCode"  // ✅ Matched state key
            onChange={onChangeHandler}
            value={data.zipCode}
            type="text"
            placeholder="Zip code"
          />
          <input
            name="country"
            onChange={onChangeHandler}
            value={data.country}
            type="text"
            placeholder="Country"
          />
        </div>
        <input
          name="phone"
          onChange={onChangeHandler}
          value={data.phone}
          type="text"
          placeholder="Phone"
        />
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
              <p>$2</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <p>${Number(getTotalCartAmount()) + 2}</p>
            </div>
          </div>
          <button type="submit" disabled={!isFormValid}>
            PROCEED TO PAYMENT
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
