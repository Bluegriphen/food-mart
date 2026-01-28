import userModel from "../models/userModel.js";


const addToCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;

    // 1. Find the user
    let userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // 2. Get the cart data object. Initialize to an empty object if null/undefined.
    let cartData = userData.cartData || {}; 

    // 3. Check if item exists and update quantity
    if (!cartData[itemId]) {
      // Item is new, initialize quantity to 1
      cartData[itemId] = 1; 
    } else {
      // Item exists, increment quantity
      cartData[itemId] += 1;
    }

    // 4. Update the user document in the database
    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Added To Cart" });

  } catch (error) {
    console.error("Add To Cart Error:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};


const removeFromCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;

    // 1. Find the user
    let userData = await userModel.findById(userId);
    
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // 2. Get the cart data object. Initialize to an empty object if undefined/null.
    let cartData = userData.cartData || {};

    // 3. Check if the item exists and has a positive quantity
    if (!cartData[itemId] || cartData[itemId] <= 0) {
      return res.status(400).json({ success: false, message: "Item not found in cart or quantity is already zero" });
    }

    // 4. Decrement the quantity
    cartData[itemId] -= 1;

    // 5. If quantity drops to zero, delete the key entirely to keep the cart clean
    if (cartData[itemId] <= 0) {
      delete cartData[itemId];
    }

    // 6. Update the user document in the database
    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Item removed from cart" });

  } catch (error) {
    console.error("Remove From Cart Error:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};


const getCart = async (req, res) => {
  try {
    const { userId } = req.body;

    // 1. Find the user document and select only the cartData field
    let userData = await userModel.findById(userId).select('cartData');
    
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // 2. Extract the cart data, defaulting to an empty object if it's null/undefined
    const cartData = userData.cartData || {};

    // 3. Send the cart data in the response
    res.json({ 
      success: true, 
      data: cartData 
    });

  } catch (error) {
    console.error("Get Cart Error:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

export { addToCart, removeFromCart, getCart };