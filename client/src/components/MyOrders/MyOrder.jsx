import React, { useContext, useEffect, useState } from "react";
import "./MyOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

// Inline SVG Icons for Visual Appeal
const Package = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 3L2 9l10 6 10-6-10-6z" />
    <path d="M2 9v10l10 6 10-6V9" />
  </svg>
);
const CheckCircle = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);
const MapPin = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const MyOrder = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { url, token } = useContext(StoreContext);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        url + "/api/order/userorders",
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        setData(response.data.data);
      } else {
        console.error("Error fetching orders:", response.data.message);
        setData([]); // Clear data on failure
      }
    } catch (error) {
      console.error("API call failed during order fetch:", error);
    } finally {
      setLoading(false);
    }
  };

  // Effect to fetch orders upon component mount or token change
  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  const getStatusStyle = (status) => {
    let styleClass = "status-default";
    if (status.includes("Placed")) styleClass = "status-Placed";
    if (status.includes("Processing")) styleClass = "status-Processing";
    if (status.includes("Out for Delivery"))
      styleClass = "status-Out-for-Delivery";
    if (status.includes("Delivered")) styleClass = "status-Delivered";
    if (status.includes("Cancelled")) styleClass = "status-Cancelled";

    return `status-badge ${styleClass}`;
  };

  if (loading) {
    return (
      <div className="order-loading-container">
        <div className="order-spinner"></div>
        <p className="order-loading-text">Loading your order history...</p>
      </div>
    );
  }

  return (
    <div className="my-order-container">
      <div className="max-w-4xl mx-auto">
        <h2 className="order-title">
          <Package className="order-icon" />
          My Order History
        </h2>

        {data.length === 0 ? (
          <div className="order-empty-container">
            <p className="order-empty-title">
              You haven't placed any orders yet!
            </p>
            <p className="order-empty-subtitle">
              Start exploring our menu to find your next meal.
            </p>
          </div>
        ) : (
          <div className="order-list">
            {data.map((order) => (
              <div key={order._id} className="order-card">
                {/* Header: Order ID and Payment Status */}
                <div className="order-header">
                  <span className="order-id">
                    Order ID: {order._id.slice(0, 10)}...
                  </span>
                  {order.payment ? (
                    <span className="payment-status-paid">
                      <CheckCircle className="payment-icon" /> PAID
                    </span>
                  ) : (
                    <span className="payment-status-pending">
                      PAYMENT PENDING (COD)
                    </span>
                  )}
                </div>

                {/* Order Details */}
                <div className="order-details-grid">
                  {/* Items */}
                  <div className="order-detail-group">
                    <p className="order-detail-title">Items Ordered:</p>
                    <p className="order-detail-items">
                      {order.items.map((item, itemIndex) => (
                        <span key={itemIndex} className="order-item-detail">
                          {item.name}{" "}
                          <span className="order-item-quantity">
                            (x{item.quantity})
                          </span>
                        </span>
                      ))}
                    </p>
                  </div>

                  {/* Total */}
                  <div>
                    <p className="order-detail-title">Total Amount:</p>
                    <p className="order-total-amount">
                      ₹{order.amount.toFixed(2)}
                    </p>
                  </div>

                  {/* Address (Truncated) */}
                  <div>
                    <p className="order-detail-title order-address-title">
                      <MapPin className="address-icon" /> Ship To:
                    </p>
                    <p className="order-address-line">
                      {order.address.street}, {order.address.city}
                    </p>
                    <p className="order-address-line order-address-zip">
                      {order.address.zipCode}
                    </p>
                  </div>
                </div>

                {/* Footer: Status and Action Button */}
                <div className="order-footer">
                  <p className="order-status-group">
                    Status:{" "}
                    <span className={getStatusStyle(order.status)}>
                      {order.status}
                    </span>
                  </p>
                  <button
                    onClick={() => console.log("Tracking order:", order._id)}
                    className="track-button"
                  >
                    Track Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrder;
