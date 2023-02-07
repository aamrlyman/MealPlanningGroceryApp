import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";

const DisplayScheduledMeals = ({meal, getScheduledMeals, schedule}) => {
  const [user, token] = useAuth(); 
  const removeMealFromSchedule = async (scheduledMealId) => {
    try {
      let response = await axios.delete(
        `http://127.0.0.1:8000/api/schedules/scheduled_meal/${scheduledMealId}/`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        },
        )
        getScheduledMeals(schedule)
        console.log(response);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <tr>
      <td>
        <input type="checkbox" value={meal.is_Cooked}></input>
      </td>
      <td>{meal.meal.name}</td>
      <td><a href="{meal.meal.url}">Recipe Link </a></td>
      <td>
        prep time: {meal.meal.prep_time_hours} hrs,{" "} {meal.meal.prep_time_minutes} min. 
        cook time:{" "} {meal.meal.cook_time_hours} hrs, {meal.meal.prep_cook_minutes}{" "} min
        <button type="submit" onClick={()=> removeMealFromSchedule(meal.id)}>X</button>
      </td>
    </tr>
  );
};
export default DisplayScheduledMeals;
