import userModel from "../models/userModel.js";

// add items to user cart
const addToCart = async (req, res) => {
  try {
    res.json({ success: true, message: "Add to cart endpoint working" });
  
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// remove items from user cart
const removeFromCart = async (req, res) => {
  try {
    res.json({ success: true, message: "Remove from cart endpoint working" });
    console.lo;
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// fetch user cart data
const getCart = async (req, res) => {
  try {
    res.json({ success: true, message: "Get cart endpoint working" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export { addToCart, removeFromCart, getCart };
