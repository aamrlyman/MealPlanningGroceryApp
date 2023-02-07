import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";

const DisplayScheduledMeals = ({ schedule, meal }) => {
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
      );
    } catch (error) {
      console.log(error.message);
    }
    console.log(meal, schedule)
  };

  return (
    <tr>
      <td>
        <input type="checkbox"></input>
      </td>
      <td>{meal.name}</td>
      <td>
        <a href="{props.meal.meal.url}">Recipe Link </a>
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
