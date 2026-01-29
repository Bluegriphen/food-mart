import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  // Backend URL configuration
  const url = "http://localhost:4000"; 
  const [token, setToken] = useState("");
  const [fetchedFoodList, setFoodList] = useState([]);

  // Function to add an item to the cart (local state and backend sync)
  const addToCart = async (itemId) => {
    // 1. Update local state
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }

    // 2. Sync with backend if user is logged in
    if (token) {
      await axios.post(
        url + "/api/cart/add",
        { itemId },
        { headers: { token } } 
      );
    }
  };

  // Function to remove an item from the cart (local state and backend sync)
  const removeFromCart = async (itemId) => {
    // 1. Update local state
    setCartItems((prev) => {
      // Check if item exists and quantity is positive before decrementing
      if (!prev[itemId] || prev[itemId] <= 0) return prev;
      
      const updatedCount = prev[itemId] - 1;
      
      // If count drops to 0, remove the item key completely
      if (updatedCount === 0) {
        const { [itemId]: _, ...rest } = prev; // Destructure to exclude the item
        return rest;
      }
      return { ...prev, [itemId]: updatedCount };
    });

    // 2. Sync with backend if user is logged in
    if (token) {
      await axios.post(
        url + "/api/cart/remove",
        { itemId },
        { headers: { token } }
      );
    }
  };

  // Calculates the total cost of all items in the cart
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = fetchedFoodList.find((product) => product._id === item);
        // Only calculate if product info is found
        if (itemInfo) { 
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  // Fetches the entire food list from the backend
  const fetchFoodList = async () => {
    try {
      const response = await axios.get(url + "/api/food/list");
      setFoodList(response.data.data);
    } catch (error) {
      console.error("Failed to fetch food list:", error);
    }
  };

  // Loads the user's saved cart data from the backend after login
  const loadCartData = async (userToken) => {
    try {
      const response = await axios.post(
        url + "/api/cart/get",
        {}, // Empty body, as userId comes from the token in headers
        { headers: { token: userToken } }
      );
      // CORRECTED: Backend returns cart data under the 'data' key
      setCartItems(response.data.data || {}); 
    } catch (error) {
      console.error("Failed to load cart data:", error);
    }
  };

  // Initialization: Fetch food list and load token/cart data
  useEffect(() => {
    async function loadData() {
      await fetchFoodList();

      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        await loadCartData(storedToken);
      }
    }
    loadData();
  }, []);

  const contextValue = {
    food_list: fetchedFoodList,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;