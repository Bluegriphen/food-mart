import React, { useContext } from "react";
import "./Fooddisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);

  // Ensure food_list is always an array
  const foods = food_list || [];

  // Filter foods by category
  const filteredFoods = foods.filter(
    (item) =>
      category === "All" ||
      item.category?.toLowerCase() === category.toLowerCase()
  );

  return (
    <div className="food-display" id="food-display">
      <h2>
        {category === "All"
          ? "Top dishes near you"
          : `Top ${category} dishes near you`}
      </h2>

      <div className="food-display-list">
        {filteredFoods.length > 0 ? (
          filteredFoods.map((item) => (
            <FoodItem
              key={item._id}
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
            />
          ))
        ) : (
          <p>No dishes available in this category.</p>
        )}
      </div>
    </div>
  );
};

export default FoodDisplay;
