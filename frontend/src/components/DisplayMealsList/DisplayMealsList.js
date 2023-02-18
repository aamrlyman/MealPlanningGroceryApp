import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import IsScheduledIcon from "../IsScheduledIcon/IsScheduledIcon";
import AddMealToScheduleButton from "../AddMealToScheduleButton/AddMealToScheduleButton";
import { Link } from "react-router-dom";

const DisplayScheduledMeals = ({ schedule, meal, getScheduledMeals, scheduledMeals}) => {
  const [user, token] = useAuth();

  return (
    <tr>
      <td>
       <IsScheduledIcon 
       scheduledMeals={scheduledMeals}  
       meal={meal}
       /> 
      </td>
      <td><Link to={ meal && `/meal/${meal.id}/`} > {meal.name}</Link></td>
      <td>
        <a href={meal.url}>Recipe Link </a>
      </td>
      <td>
        prep time: { meal && meal.prep_time_hours} hrs, { meal && meal.prep_time_minutes} min.
        cook time: { meal && meal.cook_time_hours} hrs, { meal && meal.prep_cook_minutes} min
        <AddMealToScheduleButton
        scheduleId={schedule.id} 
        scheduledMeals={scheduledMeals}
        meal={meal} 
        getScheduledMeals={getScheduledMeals}
        />
      </td>
    </tr>
  );
};
export default DisplayScheduledMeals;
