import React, { useContext } from "react";
import "./Fooditem.css";
import { StoreContext } from "../../context/StoreContext";

const FoodItem = ({ id, name = "Unknown", price = 0, description = "", image = "" }) => {
  const { cartItems = {}, addToCart, removeFromCart, url = "" } = useContext(StoreContext);

  // Prevent render crash when image or url is missing
  const imageUrl = image ? `${url}/images/${image}` : "https://via.placeholder.com/150";

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img className="food-item-image" src={imageUrl} alt={name} />
        {!cartItems?.[id] ? (
          <img
            className="add"
            onClick={() => addToCart(id)}
            src="https://img.icons8.com/sf-ultralight/35/FFFFFF/add.png"
            alt="Add"
          />
        ) : (
          <div className="food-item-counter">
            <img
              onClick={() => removeFromCart(id)}
              src="https://img.icons8.com/?size=30&id=f312qtZlDJA9&format=png&color=FA5252"
              alt="Remove"
            />
            <p>{cartItems?.[id]}</p>
            <img
              onClick={() => addToCart(id)}
              src="https://img.icons8.com/sf-ultralight/35/40C057/add.png"
              alt="Add"
            />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <span role="img" aria-label="rating">⭐⭐⭐⭐</span>
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">₹{price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
