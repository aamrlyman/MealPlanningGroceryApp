import React, { useState, useEffect } from "react";
import DisplayIngredients from "../../components/DisplayIngredients/DisplayIngredients";
import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import IsScheduledIcon from "../../components/IsScheduledIcon/IsScheduledIcon";
import AddMealToScheduleButton from "../../components/AddMealToScheduleButton/AddMealToScheduleButton";
import RemoveMealFromScheduleButton from "../../components/RemoveMealFromScheduleButton/RemoveMealFromScheduleButton";
import Ingredients from "../../components/Ingredients/Ingredients";

const DisplayUserMeal = ({ schedule, getScheduledMeals, scheduledMeals }) => {
  const [user, token] = useAuth();
  const { mealId } = useParams();
  const [meal, setMeal] = useState();

  useEffect(() => {
    const fetchMeal = async () => {
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
    fetchMeal();
  }, []);

  return (
    <div>
      <div>
        <IsScheduledIcon scheduledMeals={scheduledMeals} meal={meal} />
      </div>
      <div>
        <h1>{meal && meal.name}</h1>
      </div>
      {meal ? (
        <div>
          <p>
            Prep time {meal.prep_time_hours} hrs, {meal.prep_time_minutes} min
          </p>
          <p>
            Cook time {meal.cook_time_hours} hrs, {meal.cook_time_minutes} min
          </p>
        </div>
      ) : (
        ""
      )}
      {meal ? (
        <div>
          <h2>Ingredients</h2>
            <Ingredients
            key={mealId + "ing"}
            meal={meal} />
        </div>
      ) : (
        ""
      )}
      <div>
        <p>{meal && meal.notes}</p>
      </div>
      <div>
        <a href={meal && meal.url}> Recipe Link</a>
      </div>
      {scheduledMeals &&
      scheduledMeals.some((sMeal) => sMeal.meal.id == mealId) ? (
        <RemoveMealFromScheduleButton
          scheduledMeals={scheduledMeals}
          meal={
            scheduledMeals &&
            scheduledMeals.filter((m) => m.meal.id === mealId)[0]
          }
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

export default DisplayUserMeal;
