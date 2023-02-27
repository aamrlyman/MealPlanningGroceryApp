import React, { useState, useEffect } from "react";
import DisplayIngredients from "../../components/DisplayIngredients/DisplayIngredients";
import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import IsScheduledIcon from "../../components/IsScheduledIcon/IsScheduledIcon";
import AddMealToScheduleButton from "../../components/AddMealToScheduleButton/AddMealToScheduleButton";
import RemoveMealFromScheduleButton from "../../components/RemoveMealFromScheduleButton/RemoveMealFromScheduleButton";
import DisplayAllMealIngredients from "../../components/DisplayAllMealIngredients/DisplayAllMealIngredients";
import { useOutletContext } from "react-router-dom";
import DisplayTimes from "../../components/DisplayTimes/DisplayTimes";
import "./DisplayMeal.css";

const DisplayMeal = () => {
  const [schedule, scheduledMeals, getScheduledMeals, removeMealFromSchedule] =
    useOutletContext();
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

  return (
    <div className="mealViewContainer">
      <div className="iconNameTimesContainer">
        <div className="iconContainer">
          <IsScheduledIcon scheduledMeals={scheduledMeals} meal={meal} />
        </div>
        <div className="mealTitleContainer">
          <h1 className="mealTitle">{meal && meal.name}</h1>
        </div>
        <div className="displayTimeMealView">
          {meal ? <DisplayTimes meal={meal} /> : ""}
        </div>
      </div>
      <div className="ingredientAndNotesContainer">
        <DisplayAllMealIngredients />
        <div className="mealNotes">
          <h3>Notes:</h3>
          <p className="mealNotesP">{meal && meal.notes}</p>
        </div>
      </div>
      <div className="mealViewRecipeURL">
        <a href={meal && meal.url}> Recipe Link <i className="fa-solid fa-arrow-up-right-from-square"></i></a>
      </div>
      <div className="addButtonContainerMealView">
      {meal &&
      scheduledMeals &&
      scheduledMeals.some((sMeal) => sMeal.meal.id == meal.id) ? (
        <RemoveMealFromScheduleButton
          meal={meal}
          scheduledMeals={scheduledMeals}
          getScheduledMeals={getScheduledMeals}
          removeMealFromSchedule={removeMealFromSchedule}
          scheduleId={schedule.id}
        />
      ) : (
        scheduledMeals && (
          <AddMealToScheduleButton
            scheduledMeals={scheduledMeals}
            meal={meal}
            scheduleId={schedule.id}
            getScheduledMeals={getScheduledMeals}
          />
        )
      )}
      </div>
    </div>
  );
};

export default DisplayMeal;
