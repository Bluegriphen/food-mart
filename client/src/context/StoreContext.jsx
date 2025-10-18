import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = "http://localhost:4000";
  const [token, setToken] = useState("");
  const [fetchedFoodList, setFoodList] = useState([]);

  const addToCart = async (itemId) => {
    // ... existing logic ...
    
   if (!cartItems || !cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }

    // Optional: Add logic here to call an API to sync cart with the backend
    if (token) {
      await axios.post(
        url + "/api/cart/add",
        { itemId },
        { headers: {token}} 
      );
    }
  };

  const removeFromCart = async (itemId) => {
    // ... existing logic ...
    setCartItems((prev) => {
      if (!prev[itemId]) return prev;
      const updatedCount = prev[itemId] - 1;
      if (updatedCount <= 0) {
        const { [itemId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [itemId]: updatedCount };
    });

    // Optional: Add logic here to call an API to sync cart with the backend
    if (token) {
      await axios.post(
        url + "/api/cart/remove",
        { itemId },
        { headers:{token}}
      );
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        // Use the renamed state variable
        let itemInfo = fetchedFoodList.find((product) => product._id === item);

        // CRITICAL FIX: Add a null check for itemInfo
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  const fetchFoodList = async () => {
    try {
      const response = await axios.get(url + "/api/food/list");
      setFoodList(response.data.data);
    } catch (error) {
      console.error("Failed to fetch food list:", error);
    }
  };

  // NEW FUNCTION: Load cart data from the server
  const loadCartData = async (userToken) => {
    try {
      const response = await axios.post(
        url + "/api/cart/get",
        {},
        { headers: { token: userToken } }
      );
      setCartItems(response.data.cartData);
    } catch (error) {
      console.error("Failed to load cart data:", error);
    }
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList(); // Fetch food list first

      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        // Only load cart data if a token exists
        await loadCartData(storedToken);
      }
    }
    loadData();
    // Removed redundant token check at the top level of useEffect
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
