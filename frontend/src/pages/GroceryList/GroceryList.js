import React, { useState, useEffect } from "react";
import DisplayIngredients from "../../components/DisplayIngredients/DisplayIngredients";
import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import IsScheduledIcon from "../../components/IsScheduledIcon/IsScheduledIcon";
import AddMealToScheduleButton from "../../components/AddMealToScheduleButton/AddMealToScheduleButton";
import RemoveMealFromScheduleButton from "../../components/RemoveMealFromScheduleButton/RemoveMealFromScheduleButton";

const GroceryList = ({ schedule, getScheduledMeals, scheduledMeals }) => {
  const [user, token] = useAuth();
  const { mealId } = useParams();
  const [groceryList, setGroceryList] = useState();
  const [sortType, setSortType] = useState("ingredientsOnly");

  useEffect(() => {
    const fetchGroceries = async () => {
      try {
        let response = await axios.get(
          `http://127.0.0.1:8000/api/ingredients/grocery_list/1/`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setGroceryList(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchGroceries();
  }, []);
//   console.log(scheduledMeals.filter( (m)=> m.meal.id===mealId))

  return (
    <div>
        <ol>
      {groceryList && groceryList.map((item) =>(
          <li key={item.id}>{item.name}</li>
      )
        )}
        </ol>
    </div>
  );
};

export default GroceryList;