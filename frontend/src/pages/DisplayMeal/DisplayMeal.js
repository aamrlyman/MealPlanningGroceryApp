import React, { useState, useEffect } from "react";
import DisplayIngredients from "../../components/DisplayIngredients/DisplayIngredients";
import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import IsScheduledIcon from "../../components/IsScheduledIcon/IsScheduledIcon";
import AddMealToScheduleButton from "../../components/AddMealToScheduleButton/AddMealToScheduleButton";
import RemoveMealFromScheduleButton from "../../components/RemoveMealFromScheduleButton/RemoveMealFromScheduleButton";

const DisplayMeal = ({ schedule, getScheduledMeals, scheduledMeals }) => {
  const [user, token] = useAuth();
  const { mealId } = useParams();
  const [meal, setMeal] = useState();


  useEffect(() => {
    const fetchMeals = async () => {
      try {
        let response = await axios.get(
          `http://127.0.0.1:8000/api/meals/${mealId}/`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setMeal(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchMeals();
  }, []);
  
  const getScheduledMeal = (mealId, scheduledMeals) => {
      for(let index in scheduledMeals){
        if(scheduledMeals[index].meal.id === mealId){
          return index
        } 
      } 
  }

const index = getScheduledMeal(mealId, scheduledMeals);

console.log(scheduledMeals);
console.log(index);

  return (
    <div>
      <div>
        <IsScheduledIcon scheduledMeals={scheduledMeals} meal={meal} />
      </div>
      <div>
        <h1>{meal && meal.name}</h1>
      </div>
      <div>
        <p>Prep time</p>
        <p>Cook time</p>
      </div>
      <DisplayIngredients />
      <div>
        <p>Notes about recipe</p>
      </div>
      <div>
        <a href=""> Recipe Link</a>
      </div>
      {scheduledMeals &&
      scheduledMeals.some((sMeal) => sMeal.meal.id == mealId) ? (
        <RemoveMealFromScheduleButton
          scheduledMeals={scheduledMeals}
          meal={scheduledMeals[0]}
          schedule={schedule}
          getScheduledMeals={getScheduledMeals}
        />
      ) : (
        <AddMealToScheduleButton
          scheduledMeals={scheduledMeals}
          meal={meal}
          schedule={schedule}
          getScheduledMeals={getScheduledMeals}
        />
      )}
    </div>
  );
};

export default DisplayMeal;
