import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// Note: Ensure this URL matches your frontend development server
const frontend_url = "http://localhost:5173"; 

const placeOrder = async (req, res) => {
  try {
    // 1. Check if req.user is set by authMiddleware
    if (!req.user || !req.user.id) {
        return res.status(401).json({ success: false, message: "Not Authorized. Please login." });
    }
    const userId = req.user.id;
    
    // Destructure amount from req.body (Fix: Rely on frontend amount)
    const { cart, firstName, lastName, email, street, city, state, zipCode, country, phone, amount } = req.body;

    if (!cart || Object.keys(cart).length === 0) {
      return res.status(400).json({ success: false, message: "Cart is empty" });
    }

    // Build order items array from cart (assuming cart is {itemId: quantity})
    const items = Object.entries(cart).map(([itemId, quantity]) => ({
      itemId,
      quantity: Number(quantity)
    }));
    
    // Build address string
    const address = `${firstName}, ${lastName}, ${street}, ${city}, ${state}, ${zipCode}, ${country}, Phone: ${phone}`;

    // 2. Create Order in Database
    const newOrder = await orderModel.create({
      userId,
      items,
      amount, // Use the amount passed from the frontend
      address,
      status: "Pending Payment"
    });

    // 3. Clear user cart (Do this only after successful order creation)
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    // --- PAYMENT INTEGRATION STEP (Next Logical Step) ---
    // Here we would typically integrate with Stripe/PayPal to get a payment URL.
    // Since we don't have the payment logic, we'll return a placeholder success response.
    
    // For now, assume success and return response
    res.json({ success: true, message: "Order Placed Successfully (Payment skipped in this version)", orderId: newOrder._id });

  } catch (error) {
    console.error("Error placing order:", error);
    // Respond with 500 and a proper success: false flag
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


export { placeOrder };
