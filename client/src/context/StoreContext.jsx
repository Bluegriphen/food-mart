import { createContext, useEffect, useState } from "react";
<<<<<<< HEAD
=======
// Removed import { food_list } since you are fetching food list dynamically
>>>>>>> b32db616d3f493326a8a499345dbaaf94957efd1
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = "http://localhost:4000";
  const [token, setToken] = useState("");
  const [fetchedFoodList, setFoodList] = useState([]);

  const addToCart = async (itemId) => {
<<<<<<< HEAD
    // ... existing logic ...
    
   if (!cartItems || !cartItems[itemId]) {
=======
    if (!cartItems[itemId]) {
>>>>>>> b32db616d3f493326a8a499345dbaaf94957efd1
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }

    // Optional: sync cart with backend if token exists
    if (token) {
      await axios.post(
        url + "/api/cart/add",
        { itemId },
        { headers: {token}} 
      );
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => {
      if (!prev[itemId]) return prev;
      const updatedCount = prev[itemId] - 1;
      if (updatedCount <= 0) {
        const { [itemId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [itemId]: updatedCount };
    });

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
        let itemInfo = fetchedFoodList.find((product) => product._id === item);
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
<<<<<<< HEAD
    food_list: fetchedFoodList, 
=======
    food_list: fetchedFoodList,
>>>>>>> b32db616d3f493326a8a499345dbaaf94957efd1
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
