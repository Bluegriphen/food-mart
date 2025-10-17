
import orderModel from "../models/orederModel.js";
import userModel from "../models/userModel.js";
// import Stripe from "stripe";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const frontend_url = "http://localhost:5173"; // or use from env

const placeOrder = async (req, res) => {
  try {
    console.log("Request User:", req.user);
    const userId = req.user.id;  // Get user ID from middleware
    const { items, amount, address } = req.body;

    if (!items?.length || !amount || !address) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    console.log("Placing order for user:", userId);

    const newOrder = await orderModel.create({
        userId,
        items,
        amount,
        address
    });
    console.log("Order saved:", newOrder);
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true /* session_url if Stripe */ });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



export { placeOrder };
