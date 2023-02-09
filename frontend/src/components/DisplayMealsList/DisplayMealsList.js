import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";

const DisplayScheduledMeals = ({ schedule, meal, getScheduledMeals, scheduledMeals}) => {
  const [user, token] = useAuth();

  const addMealToSchedule = async (schedule, meal) => {
    try {
      let response = await axios.post(
        `http://127.0.0.1:8000/api/schedules/${schedule.id}/`,
        {
          meal_id: meal.id,
          schedule_id: schedule.id,
          user_id: user.id,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      getScheduledMeals(schedule);
      console.log(response)
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <tr>
      <td>
      { scheduledMeals && scheduledMeals.some((sMeal) => sMeal.meal.id == meal.id)? 
        <i className="fa-solid fa-check"></i>
        :
        <i className="fa-regular fa-square"></i>
        }
      </td>
      <td>{meal.name}</td>
      <td>
        <a href={meal.meal.url}>Recipe Link </a>
      </td>
      <td>
        prep time: {meal.prep_time_hours} hrs, {meal.prep_time_minutes} min.
        cook time: {meal.cook_time_hours} hrs, {meal.prep_cook_minutes} min
        <button
          onClick={() => addMealToSchedule( schedule, meal)}
        >
          Add
        </button>
      </td>
    </tr>
  );
};
export default DisplayScheduledMeals;
