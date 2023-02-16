import React, { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import IsScheduledIcon from "../IsScheduledIcon/IsScheduledIcon";
import AddMealToScheduleButton from "../AddMealToScheduleButton/AddMealToScheduleButton";
import { Link } from "react-router-dom";
import DeleteUserMeal from "../DeleteMeal/DeleteMeal";

const DisplayScheduledMeals = ({ schedule, meal, getScheduledMeals, scheduledMeals, isDelete, fetchMeals}) => {
  const [user, token] = useAuth();


  return (
    <tr>
      <td>
       <IsScheduledIcon 
       scheduledMeals={scheduledMeals}  
       meal={meal}
       /> 
      </td>
      <td><Link to={ meal && `/userMeal/${meal.id}/`} > {meal.name}</Link></td>
      <td>
        <a href={meal.url}>Recipe Link </a>
      </td>
      <td>
        prep time: { meal && meal.prep_time_hours} hrs, { meal && meal.prep_time_minutes} min.
        cook time: { meal && meal.cook_time_hours} hrs, { meal && meal.prep_cook_minutes} min
        <AddMealToScheduleButton
        schedule={schedule} 
        scheduledMeals={scheduledMeals}
        meal={meal} 
        getScheduledMeals={getScheduledMeals}
        />
      </td>   
    { isDelete && meal && 
     <td><DeleteUserMeal meal={meal} fetchMeals={fetchMeals}/></td>}
    </tr>
  );
};
export default DisplayScheduledMeals;
