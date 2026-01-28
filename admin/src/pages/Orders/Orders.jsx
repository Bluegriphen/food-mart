import { useState, useEffect } from "react";
import "./Orders.css";
import axios from "axios";
import { toast } from "react-toastify"; // Assuming you are using toastify for notifications
import { assets } from "../../assets/assets"; // Ensure you have a parcel icon or remove this line

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  // Function to fetch all orders from the backend
  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + "/api/order/list");
      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      toast.error("Server Error");
    }
  };

  // Function to update order status
  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(url + "/api/order/status", {
        orderId,
        status: event.target.value,
      });
      if (response.data.success) {
        await fetchAllOrders(); // Refresh the list to see the updated status
      }
    } catch (error) {
      console.log(error);
      toast.error("Error updating status");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="order add">
      <h3>Order Page</h3>

      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className="order-item">
            {/* Parcel Icon - Make sure to import this or replace with an <img> tag */}
            <img src={assets.parcel_icon} alt="parcel" />

            <div>
              {/* Logic to display food items as a comma-separated string */}
              <p className="order-item-food">
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity;
                  } else {
                    return item.name + " x " + item.quantity + ", ";
                  }
                })}
              </p>

              {/* Customer Name and Address */}
              <p className="order-item-name">
                {order.address.firstName + " " + order.address.lastName}
              </p>
              <div className="order-item-address">
                <p>{order.address.street + ","}</p>
                <p>
                  {order.address.city +
                    ", " +
                    order.address.state +
                    ", " +
                    order.address.country +
                    ", " +
                    order.address.zipCode}
                </p>
              </div>
              <p className="order-item-phone">{order.address.phone}</p>
            </div>

            <p>Items: {order.items.length}</p>
            <p>₹{order.amount}</p>

            {/* Status Dropdown */}
            <select
              onChange={(event) => statusHandler(event, order._id)}
              value={order.status}
            >
              <option value="Order Placed">Order Placed</option>
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
