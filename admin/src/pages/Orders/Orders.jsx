import { useState, useEffect } from "react";
import "./Orders.css";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get(url + "/api/order/list");
      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      toast.error("Server Error");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(url + "/api/order/status", {
        orderId,
        status: event.target.value,
      });
      if (response.data.success) {
        toast.success("Order status updated successfully!");
        await fetchAllOrders();
      }
    } catch (error) {
      console.log(error);
      toast.error("Error updating status");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  // Format items display
  const formatItems = (items) => {
    return items.map((item, index) => (
      <span key={index}>
        {item.name} x {item.quantity}
        {index < items.length - 1 && ", "}
      </span>
    ));
  };

  // Format address
  const formatAddress = (address) => {
    if (!address) return "No address provided";
    const { street, city, state, country, zipCode } = address;
    return `${street ? street + ", " : ""}${city ? city + ", " : ""}${
      state ? state + ", " : ""
    }${country ? country + ", " : ""}${zipCode || ""}`.replace(/,\s*$/, "");
  };

  if (loading) {
    return (
      <div className="order add">
        <h3>Orders</h3>
        <div className="orders-loading">
          <div className="loader"></div>
          <p>Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="order add">


      <div className="order-list">
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <div key={order._id || index} className="order-item">
              {/* Parcel Icon */}
              <img 
                src={assets.parcel_icon} 
                alt="parcel" 
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/50";
                }}
              />

              {/* Order Details */}
              <div>
                <p className="order-item-food">
                  {formatItems(order.items || [])}
                </p>
                <p className="order-item-name">
                  {order.address?.firstName || "Guest"} {order.address?.lastName || ""}
                </p>
                <div className="order-item-address">
                  <p>{formatAddress(order.address)}</p>
                </div>
                {order.address?.phone && (
                  <p className="order-item-phone">📞 {order.address.phone}</p>
                )}
              </div>

              {/* Items Count */}
              <p>
                <strong>Items:</strong> {order.items?.length || 0}
              </p>

              {/* Total Amount */}
              <p>
                <strong>₹{order.amount?.toLocaleString() || 0}</strong>
              </p>

              {/* Status Dropdown */}
              <select
                onChange={(event) => statusHandler(event, order._id)}
                value={order.status || "Order Placed"}
                style={{
                  backgroundColor: 
                    order.status === "Delivered" ? "#55efc4" :
                    order.status === "Out for delivery" ? "#81ecec" :
                    order.status === "Food Processing" ? "#a29bfe" :
                    order.status === "Order Placed" ? "#ffeaa7" : "#f8fafc"
                }}
              >
                <option value="Order Placed">📝 Order Placed</option>
                <option value="Food Processing">🔪 Food Processing</option>
                <option value="Out for delivery">🚚 Out for delivery</option>
                <option value="Delivered">✅ Delivered</option>
              </select>
            </div>
          ))
        ) : (
          <div className="no-orders">
            <p>No orders found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;